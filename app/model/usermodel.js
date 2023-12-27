const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:Number,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
       type:String,
       default:"user"
    },
    isBlockd:{
       type:Boolean,
       default:false, 
    },
    cart:{
        type:Array,
        default:[]
    },
    Address:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Address"
      }],
    wishlist:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
      } ]
},
  {
    timestamps: true,
  },
  {
    versionKey: false,
  });

//Export the model
module.exports = mongoose.model('User', userSchema);