

const stripe = require('../config/stripe'); 
const Order = require('../models/orderModel'); 

const FRONTEND_URL = "http://localhost:3000/"; 



const createOrder = async (req, res) => {
  try {
    const { items, email, totalAmount } = req.body;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).send({ error: 'Invalid or empty items array.' });
    }

    const hasInvalidItems = items.some(
      (item) => !item.name || !item.price || !item.quantity || item.quantity <= 0
    );

    if (hasInvalidItems) {
      return res.status(400).send({ error: 'Each item must have a valid name, price, and quantity.' });
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.name },
          unit_amount: item.price * 100, 
        },
        quantity: item.quantity,  
      })),
      mode: 'payment',
      success_url: `${FRONTEND_URL}/success`,
      cancel_url: `${FRONTEND_URL}/failure`,
      customer_email: email,
    });

    // Create a new order in the database
    const newOrder = new Order({
      items,
      email,
      totalAmount,
      paymentStatus: 'Pending',
      transactionId: session.id,
    });

    await newOrder.save();

    res.json({ url: session.url });
  } catch (err) {
    console.error('Error creating order:', err.message || err);
    res.status(500).send({ error: 'Payment failed. Please try again later.' });
  }
};


// Function to handle Stripe webhook events
const webhookHandler = async (req, res) => {
  const event = req.body; 

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object; 

    const order = await Order.findOne({ transactionId: session.id });
    
    if (order) {
      order.paymentStatus = 'Success'; 
      await order.save(); 
    }
  }

  res.sendStatus(200); 
};

module.exports = { createOrder, webhookHandler }; 