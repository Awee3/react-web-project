const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const snap = require('./payment/midtrans');

//middleware
app.use(cors());
app.use(express.json());

let loggedInUsers = {};

//ROUTE
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );
    if (user.rows.length > 0) {
      const userData = user.rows[0];
      loggedInUsers[userData.user_id] = userData;
      res.status(200).json(userData);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/signup', async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, password, phone]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//book data
// Fungsi untuk mendapatkan roomId yang tersedia berdasarkan roomType
async function getRandomAvailableRoomId(roomType) {
  const roomIdQuery = `
    SELECT room_id FROM room
    WHERE room_type = $1 AND status = 'available'
    ORDER BY RANDOM()
    LIMIT 1
  `;
  const roomIdResult = await pool.query(roomIdQuery, [roomType]);
  if (roomIdResult.rows.length > 0) {
    return roomIdResult.rows[0].room_id;
  } else {
    throw new Error('No available rooms for the selected type');
  }
}

app.post('/book', async (req, res) => {
  const { phone, roomType, startDate, durasi } = req.body;

  try {
    // Cari userId berdasarkan nomor telepon
    const userQuery = 'SELECT user_id FROM users WHERE phone = $1';
    const userResult = await pool.query(userQuery, [phone]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userId = userResult.rows[0].user_id;

    const roomId = await getRandomAvailableRoomId(roomType);

    // Menghitung endDate dari startDate + durasi bulan
    const endDateQuery = `
      SELECT ($1::date + INTERVAL '${durasi} month')::date AS end_date
    `;
    const endDateResult = await pool.query(endDateQuery, [startDate]);
    const endDate = endDateResult.rows[0].end_date;

    // Mendapatkan harga kamar
    const priceQuery = 'SELECT price FROM room WHERE room_id = $1';
    const priceResult = await pool.query(priceQuery, [roomId]);
    const pricePerMonth = priceResult.rows[0].price;

    // Menghitung total amount
    const totalAmount = pricePerMonth * durasi;

    const transactionDetails = {
      transaction_details: {
        order_id: `order-id-${Date.now()}`,
        gross_amount: totalAmount
      },
      customer_details: {
        first_name: userResult.rows[0].name,
        email: userResult.rows[0].email,
        phone: phone
      }
    };

    const transaction = await snap.createTransaction(transactionDetails);

    // Masukkan order_id ke tabel booking
    const newBookingQuery = `
      INSERT INTO booking (user_id, room_id, start_date, end_date, order_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const newBooking = await pool.query(newBookingQuery, [userId, roomId, startDate, endDate, transactionDetails.transaction_details.order_id]);
    const bookingId = newBooking.rows[0].booking_id;

    res.status(201).json({ bookingId, paymentToken: transaction.token });
  } catch (err) {
    console.error('Error in booking request:', err.message);
    res.status(500).send('No available rooms for the selected type');
  }
});


//payment data
app.post('/payment-callback', async (req, res) => {
  const { order_id, transaction_status, payment_type, gross_amount, transaction_time } = req.body;
  console.log("Received payment request:", req.body);
  try {
    if (transaction_status === 'settlement') {
      // Ambil booking_id dari order_id
      const bookingIdQuery = `
        SELECT booking_id FROM booking WHERE order_id = $1
      `;
      const bookingIdResult = await pool.query(bookingIdQuery, [order_id]);
      if (bookingIdResult.rows.length === 0) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      const bookingId = bookingIdResult.rows[0].booking_id;

      // Ambil room_id dari booking_id
      const roomIdQuery = `
        SELECT room_id FROM booking WHERE booking_id = $1
      `;
      const roomIdResult = await pool.query(roomIdQuery, [bookingId]);
      if (roomIdResult.rows.length === 0) {
        return res.status(404).json({ message: 'Room not found' });
      }
      const roomId = roomIdResult.rows[0].room_id;

      // Update status room menjadi 'booked'
      const updateRoomStatusQuery = `
        UPDATE room
        SET status = 'booked'
        WHERE room_id = $1
      `;
      await pool.query(updateRoomStatusQuery, [roomId]);

      // Masukkan data ke tabel payment
      const insertPaymentQuery = `
        INSERT INTO payment (booking_id, amount, payment_method, payment_date)
        VALUES ($1, $2, $3, $4)
      `;
      await pool.query(insertPaymentQuery, [bookingId, gross_amount, payment_type, transaction_time]);

      res.status(200).send('Payment successful and room status updated');
    } else {
      res.status(200).send('Payment not successful or pending');
    }
  } catch (err) {
    console.error('Error in payment callback:', err.message);
    res.status(500).send('Server Error');
  }
});

//get room data
app.get('/room', async (req,res)=>{
  try {
    const roomData = await pool.query("SELECT * FROM room");
    res.json(roomData.rows);
  } catch (error) {
    console.log(err.message);
  }
})

//get book data
app.get('/book', async (req,res)=>{
  try {
    const bookData = await pool.query("SELECT * FROM booking");
    res.json(bookData.rows);
  } catch (error) {
    console.log(err.message);
  }
})

//get user data
app.get("/signup", async (req, res)=>{
  try {
    const allData = await pool.query("SELECT * FROM users");
    res.json(allData.rows);
  } catch (error) {
    console.log(err.message);
  }
})

//get payment data
app.get("/payment", async (req, res)=>{
  try {
    const paymentData = await pool.query("SELECT * FROM payment");
    res.json(paymentData.rows);
  } catch (error) {
    console.log(err.message);
  }
})

app.listen(5000, () => {
  console.log("server has started on port 5000")
});