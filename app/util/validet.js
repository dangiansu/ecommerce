const mongoose = require('mongoose')


 // Validate if id is a valid ObjectId (assuming you are using MongoDB)
const isvalideid = (id)=>{
    const valide =!mongoose.Types.ObjectId.isValid(id)
    if(!valide){
        return res.status(400).json({
            msg: "Invalid user ID",
            success: false,
        })
    }
}
module.exports= isvalideid