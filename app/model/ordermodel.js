const mongoose = require('mongoose');

// Define the Order schema
const orderSchema = new mongoose.Schema({
  Orderby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Reference to the Product collection
      },
     count :Number,
     color:String,
     
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  Orderstatus: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Order model using the schema
module.exports = mongoose.model('Order', orderSchema);

