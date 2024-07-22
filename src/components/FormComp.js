import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Container, Row, Col } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const FormComp = () => {
  const [startDate, setStartDate] = useState(null);
  const [durasi, setDurasi] = useState(""); // Nilai default durasi 3 bulan
  const [tipe , setTipe] = useState("");
  const [phone, setPhone] = useState("");
  const [warning, setWarning] = useState("");
  const [roomStatus, setRoomStatus] = useState("");

  const handleActionClick = async () => {
    if (!phone || !tipe || !startDate || !durasi) {
      setWarning("All fields are required");
      return;
    }
    setWarning("");
    
    try {
      // Cek ketersediaan kamar berdasarkan tipe kamar
      const roomResponse = await axios.get('http://localhost:5000/room');
      const availableRooms = roomResponse.data.filter(room => room.room_type === tipe);
      if (availableRooms.length === 0) {
        setRoomStatus("Kamar tidak tersedia saat ini.");
        return;
      } else {
        setRoomStatus("");
      }
      
      const bookingData = {
        phone,
        roomType: tipe,
        startDate: startDate.toISOString().split('T')[0], // Konversi ke format yyyy-mm-dd
        durasi
      };
  
      console.log("Booking data to be sent:", bookingData);

      const response = await axios.post('http://localhost:5000/book', bookingData);
      console.log("Booking response:", response.data);
      
      window.snap.pay(response.data.paymentToken, {
        onSuccess: async function(result) {
          console.log('Payment success:', result);
          
          // Kirim data pembayaran ke backend untuk disimpan
          const paymentData = {
            order_id: result.order_id,
            transaction_status: result.transaction_status,
            payment_type: result.payment_type,
            gross_amount: result.gross_amount,
            transaction_time: result.transaction_time
          };
          try {
            const paymentResponse = await axios.post('http://localhost:5000/payment-callback', paymentData);
            console.log('Payment saved:', paymentResponse.data);
          } catch (error) {
            console.error('Error saving payment:', error.response?.data || error.message);
          }
        },
        onPending: function(result) {
          console.log('Payment pending:', result);
        },
        onError: function(result) {
          console.log('Payment error:', result);
        },
        onClose: function() {
          console.log('Payment popup closed');
        }
      });
    } catch (error) {
      console.error("Error in booking request:", error.response?.data || error.message);
      setWarning(error.response?.data.message || "Ruangan tidak tersedia");
    }
  }

  return (
    <Container
      fluid
      data-aos="fade-up"
      data-aos-duration='2000'
      id='book'
    >
      <div className="title-holder text-center">
        <h2>Book Now!</h2>
      </div>
      <Row>
        <Col>
          <div className='pt-3 d-flex justify-content-center align-items-center'>
            <Form className='rounded p-4 p-sm-3'>

              <Form.Group className='mb-3'>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type='text'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder='Enter your phone number'
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Tipe Kamar</Form.Label>
                <Form.Select 
                  value={tipe}
                  onChange={(e) => setTipe(e.target.value)}
                  aria-label="Default select example"
                >
                  <option value="">Pilih Tipe Kamar</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Suite">Suite</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Durasi </Form.Label>
                <Form.Select  
                  aria-label="Default select example"
                  value={durasi}
                  onChange={(e) => setDurasi(e.target.value)}
                >
                  <option value="">Pilih Durasi</option>
                  <option value="3">3 Bulan</option>
                  <option value="6">6 Bulan</option>
                  <option value="12">12 Bulan</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label>Tanggal Mulai menempati</Form.Label>
                <div>
                <DatePicker className='mb-3'
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                  minDate={new Date()}
                />
                </div>
              </Form.Group>
              {warning && <div className="warning">{warning}</div>}
              {roomStatus && <div className="warning">{roomStatus}</div>}
              <Form.Group className='mb-1'>
                <Button type='button' variant="primary" onClick={handleActionClick}>
                  Book
                </Button>
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default FormComp;
