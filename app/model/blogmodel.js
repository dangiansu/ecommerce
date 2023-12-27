const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    numViews:{
        type:Number,
        default:0,
    },
    isLiked:{
        type:Boolean,
        default:false,
    },
    isDisliked:{
        type:Boolean,
        default:false,
    },
    liked:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    dislikes:[{
         type: mongoose.Schema.Types.ObjectId,
         ref:"User",
    }],
    image:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuoN-uw47N1oADK1ojLB9dO2FV4rXgpfC02rdaJqsM&s"
    },
    author:{
        type:String,
        default:"Admin"
    },
},
{
    toJSON:{
        virtuals: true,
    },
    toObject:{
        virtuals: true   
    },
    timeseries: true
}
);

//Export the model
module.exports = mongoose.model('Blog', blogSchema);