const Blog = require('../model/blogmodel')
const User = require('../model/usermodel')

//create blogs here -->

exports.createblog = async(req,res)=>{
   try{
    const {title,description,category,} = req.body
    if(!title && !description  && !category){
        return res.status.send({
            msg:"Please enter a field properly",
            success: false
        })
    }
    const blogs = await Blog.create({
        title,
        description,
        category
    })
      
    return res.status(200).send({
        msg:"Blog added successfully",
        success:true,
        data: blogs
    })

   }
   catch(err){
    return res.status(404).send({
        msg:"Server error",
        error: err.message
    })
   }
}

//getallblogs here -->

exports.getallblogs = async(req,res)=>{
    try{
       const getallblogs = await Blog.find()
       if(!getallblogs){
        return res.status(404).send({
            msg:"Blogs not found "

        })
       }
       return res.status(200).send({
        msg:"get blogs successfully",
        success:true,
        data:getallblogs
       })

    }
    catch(err){
        return res.status(500).send({
            msg:"Server error",
            error: err.message

        })
    }
}

//getsingleblogs here -->

exports.getblogs = async(req,res)=>{
  try{
     filter = req.params.id
     const getblog = await Blog.findById(filter)
     if(!getblog){
        return res.status(404).send({
            msg:"blog not found",
            success: true
        })
     }
     const updateblog = await Blog.findByIdAndUpdate(filter,{$inc:{numViews:1},},{new:true});
     return res.status(200  ).send({
        msg:"Blog get successfully",
        success: true,
        data:updateblog
     })
  }
  catch(err){
    return res.status(500).send({
        msg:"Server error",
        error: err.message
    })
  }  
}

//deleteblogs api's here -->

exports.deleteblogs = async(req,res)=>{
    try{
        const filter = req.params.id
        const deleteblog = await Blog.findByIdAndDelete(filter)
        if(!deleteblog){
            return res.status(404).send({
                msg:"Blog is alerday deleted",
                success: false,

            })
        }
        return res.status(200).send({
            msg:"Blog deleted successfully",
            success: true,
            data:deleteblog
        })

    }
    catch(err){
        return res.status(500).send({
            msg:"Server error",
            error: err.message
        })
    }
}

//update blogs api's here -->

exports.updateblogs = async(req,res)=>{
    try{
        const { title , description , blog} = req.body
        // if(!title || !description || !blog){
        //     return res.status(404).send({
        //         msg:"fields is required",
        //         success: false
        //     })
        // }
       const filter = req.params.id
       const updateblogs = await Blog.findByIdAndUpdate(filter,req.body,{new:true})
       if(!updateblogs){
        return res.status(404).send({
            msg:"Blog not found",
            success: true,
        })
       }
       return res.status(200).send({
        msg:"Blog updated successfully",
        success: true,
        data:updateblogs
       })
    }
    catch(err){
        return res.status(500).send({
            msg:"Server error",
            success: false,
            error: err.message
        })
    }
}


