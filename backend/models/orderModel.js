

const mongoose = require('mongoose');

// Define the schema for the order
const orderSchema = new mongoose.Schema({
  items: [
    {
      name: { type: String, required: true }, 
      price: { type: Number, required: true }, 
      quantity: { type: Number, required: true }, 
    },
  ],
  email: { type: String, required: true }, 
  totalAmount: { type: Number, required: true }, 
  paymentStatus: { type: String, default: 'Pending' }, 
  transactionId: { type: String, required: true }, 
}, { timestamps: true }); 

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;