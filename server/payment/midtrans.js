const midtransClient = require('midtrans-client');

// Create Snap API instance
let snap = new midtransClient.Snap({
    isProduction: false, // Ubah ke true jika sudah di production
    serverKey: 'SB-Mid-server-tAiphJWv0KhSNPkQERPh2x1K'
});

module.exports = snap;
