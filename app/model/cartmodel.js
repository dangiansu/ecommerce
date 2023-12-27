const mongoose = require('mongoose');

// Define the Order schema
const cartSchema = new mongoose.Schema({
  
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Reference to the Product collection
      },
     count :Number,
     color:String,
     price:Number
     
    }
  ],
  cartTotal: {
    type: Number,
    required: true
  },
  Orderby:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  totalAfterDiscount:Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Order model using the schema
module.exports = mongoose.model('Cart', cartSchema);

