const Coupon = require('../model/coupenmodel')
const User = require('../model/usermodel')


// create coupon api's here -->

exports.createcoupon = async(req,res)=>{  
    try{
       const {name,discount,expiry} = req.body
       if(!name || !discount || !expiry){
        return res.status(404).sned({
            msg:"field is required",
            success:false
        })
       }
       const Createdcoupon = await Coupon.create(req.body)
       return res.status(200).send({
        msg:"coupon created successfully",
        success:true,
        data:Createdcoupon
       })
    }
    catch(err)
    {
        console.log("-->",err)
        return res.status(500).send({
            msg:"Server error",
            error:err.message
        })
    }

}

// get allcoupon api's here -->

exports.getallcoupon = async(req,res)=>{
    try{
        const findallcoupon = await Coupon.find()
        if(!findallcoupon){
            return res.status(404).send({
                msg:"Coupon not found",
                success:true
            })
        }
        return res.status(200).send({
            msg:"Coupon get successfully",
            success:true,
            data:findallcoupon
        })
    }
    catch(err)
    {
        console.log("--->",err)
        return res.status(500).send({
            msg:"Server error",
            error:err.message
        })
    }

}  

//get coupon api's here -->

exports.getcoupon = async(req,res)=>{
    try{
        const  {id} = req.params
        const findcoupon = await Coupon.findById(id)
        if(!findcoupon){
            return res.status(200).send({
                msg:"Coupon not found",
                success:false
            })
        }
        return res.status(200).send({
            msg:"Coupon get successfully",
            success:true,
            data:findcoupon
        })

    }
    catch(err)
    {
        console.log('-->',err)
        return res.status(500).send({
            msg:"Server error",
            success:false,
            error:err.message
        })
    }
}  

//deleted coupon api's here -->

exports.deletecoupon = async(req,res)=>{
    try{
        const {id}= req.params
        const deletedcoupon = await Coupon.findOneAndDelete(id)
        if(!deletedcoupon)
        {
            return res.status(404).send({
                msg:"Coupon not found",
                success:false,
            })
        }
        return res.status(200).send({
            msg:"Coupon deleted successfully",
            success:true,
            data:deletedcoupon
        })

    }
    catch(err)
    {
        console.log('-->',err)
        return res.status(500).send({
            msg:"Server error",
            success:false
        })
    }
}

//update a coupon api's here -->

exports.updatecoupon = async(req,res)=>{
    try{
        const {id} = req.params
        const {name,discount,expiry} = req.body
        console.log(id)
        console.log(req.body)
        const updatecoupon = await Coupon.findByIdAndUpdate(id,req.body,{new:true})
        console.log(updatecoupon)
        if(!updatecoupon){
            return res.status(404).send({
                msg:"Coupon not found",
                success:false
            })
        }
        return res.status(200).send({
            msg:"Coupon updated successfully",
            success:true,
            data:updatecoupon,
        })
    }
    catch(err)
    {
       console.log("-->",err)
       return res.status(500).send({
        msg:"Server error",
        error:err.message
       })
    }
}