const Product = require('../model/productmodel')
const User = require('../model/usermodel')
const cloudinary = require("cloudinary").v2;
const slugify = require('slugify')


//cloudinary credentials

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET_KEY,
    secure: true

  });


//add product api's here -->

exports.addproduct = async (req, res) => {
    try {
      const { title,slug,description, price, quantity,category,brand,color } = req.body;
      if(req.body.title){
        req.body.slug = slugify(req.body.title);
      }
      
      // Check if any required fields are missing
      if (!title || !description || !price || !quantity || !category || !brand || !color) {
        return res.status(400).json({
          message: "Please provide all required fields, including an image.",
          success: false,
        });
      }
  
      // Upload the image to Cloudinary

    //       if(!req.file){
    //      return res.status(404).send({msg:"Image Not found"})
    // }
    // const result = await cloudinary.uploader.upload(req.file.path,
    //     {
    //         folder: "Products/images",
    //     });
    
      // Create the product
      const product = await Product.create({
        title,
        slug : req.body.slug,
        description,
        price,
        quantity,
        category,
        brand,
        color,
       
        // image: result.secure_url,
        // cloudinary_id: result.public_id,
      });
  
      return res.status(200).json({
        message: "Product added successfully.",
        status: 200,
        success: true,
        product,
      });
    } catch (error) {
      console.error("-->",error); // Log the error for debugging
      return res.status(500).json({
        message: "Server error. Unable to add the product.",
        status: 500,
        success: false,
      });
    }
  };

//get product by id api's here -->

exports.getproduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      const findProduct = await Product.findById(id);
      if (!findProduct) {
        return res.status(404).json({
          success: false,
          error: 'Product not found',
        });
      }
  
      return res.status(200).json({
        success: true,
        data: findProduct,
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  };

//get all product wayxs filtering
  
exports.getallproducts = async (req,res) => {
   try{
    //  const filter = req.query
     const queryObj = {...req.query}
     console.log("xx",queryObj)
    
    //  const search = req.query.search
    //  console.log(search)
    // const filter = { $or: [{ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } },{ slug: { $regex: search, $options: 'i' } }] };
    const excludefield = ['page','sort','limit','field']
    excludefield.forEach((el)=> 
    delete queryObj[el])
    console.log(queryObj)
    let querystr = JSON.stringify(queryObj)
    querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=> `$${match}`);
    const queryStr = JSON.parse(querystr)

    console.log("----->",queryStr)
    let query =   Product.find(queryStr);

    //searching 

    // if(req.query.search){
    //    const search = queryObj.search
    //    console.log(search)
    //   query = { $or: [{ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } },{ slug: { $regex: search, $options: 'i' } }] };
    //  }
    
    //sortings 

    if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(" ")
      query= query.sort(sortBy)

    }
    else{
      query = query.sort("-createdAt")
    }

    //fields 
    if(req.query.fields){
      const fields = req.query.fields.split(',').join(" ")
      console.log('------->',fields)
      query = query.select(fields)
    }
    else{
      query = query.select('__v')
    }

    //pagination
    const page =req.query.page
    const limit = req.query.limit
    const skip = (page-1)*limit
    console.log("-->", page,limit,skip)
    query = query.skip(skip).limit(limit)
    console.log("->",query)
    if(req.query.page){
      const productcount = await Product.countDocuments()
      if(skip >= productcount) throw new error("this page not exit")

    }
     
    const getallProduct = await query;
    

    if(!getallProduct){
      return res.status(404).json({
        msg:"Product not found",
        success:false
      })
    }
    return res.status(200).json({
      msg:"Product get succesfully",
      success:true,
      data:getallProduct
    })
  }
  catch(error){
    console.log("-->",error)
    return res.status(500).json({
      msg:"server error",
      success:false,
      Error:error.message
    })

  }
 
}

//delete single product

exports.deleteproduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or already deleted',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct,
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

//update product 

exports.updateproduct = async (req,res)  =>  {
  try{
    const { title,slug,description, price, quantity,category,brand,color } = req.body;
    console.log('-->',req.body)
    if(req.body.title){
      console.log("-->",req.body.title)
      req.body.slug = slugify(req.body.title);
    }
    const productdata = { title,slug:req.body.slug,description, price, quantity,category,brand,color }

    const {id} = req.params
    console.log("-->",id)

    const updateproduct = await Product.findByIdAndUpdate(id,productdata,{new:true})
    
    if(!updateproduct){
      return res.status(404).json({
        msg:"Product not found",
        success: false,

      })
    }
    return res.status(200).json({
      msg:"Product updated successfully",
      success: true,
      updateproduct
    })


  }
  catch(error){
    console.log("-->",error)
    return res.status(500).json({
      msg:"Server error",
      success: false,
      error:error.message
    })
  }
}

// add wishlist and remove wishlist

exports.wishlist = async(req,res)=>{
  try{
   const {_id} = req.user
   console.log(_id)
   const prodId = req.body.prodId

   const finduser = await User.findById(_id)
   const alreadyadded = await finduser.wishlist.find((id)=>id.toString() ===  prodId)
   if(alreadyadded){
    let user = await User.findByIdAndUpdate(_id ,{ $pull:{ wishlist: prodId},},{
      new:true
    })
    return res.status(200).send({
      msg:"Add wishlist",
      success:true,
      data:user

    })
   }
   else{
    let user = await User.findByIdAndUpdate(_id ,{ $push:{ wishlist: prodId},},{
      new:true
    })
    return res.status(200).send({
      msg:"Remove wishlist",
      success:true,
      data:user

    })
   }
   }
  catch(err){
   return res.status(500).send({
    msg:"Server error",
    error:err.message
   })
  }
}

//rating feature api's here -->

exports.ratings = async(req,res)=>{
  try{
    const {_id} = req.user
    const { star,prodId, comment} = req.body
    console.log(star,prodId,comment)
    const findproduct = await Product.findById(prodId)
    console.log("-->",findproduct)
    const aleradyrated = await findproduct.ratings.find((userId)=> userId.postedby.toString() === _id.toString())
    console.log(aleradyrated)
    if(aleradyrated){
      const updateratings = await Product.updateOne(  
        {
        ratings:{$elemMatch: aleradyrated},
        },
        {
          $set:{"ratings.$.star":star,"ratings.$.comment":comment},
        },
        {
          new:true
        }
      )
      return res.status(200).send({
        msg:"rating update successfully",
        success:true,
        

      })
    }
    else{
      const rateproducts = await Product.findByIdAndUpdate(prodId,
        {
         $push:{
          ratings:{
            star:star,
            comment:comment,
            postedby:_id
          },
         },
      },
      {
        new:true
      })

    }
    const getallratings = await Product.findById(prodId)
    const totalRatings = getallratings.ratings.length;
    // console.log(totalratings)
    const ratingsum = getallratings.ratings.map((item)=> item.star).reduce((pre,cre)=> pre+cre,0)
    const actuallratings = Math.round(ratingsum/totalRatings)
    console.log("--->",actuallratings)
    const finalratings = await Product.findByIdAndUpdate(prodId,  
      {
        totalrating:actuallratings
      },
      {
        new:true
      }
    )

    res.json(finalratings)

    


  }
  catch(err){
    return res.status(500).send({
      msg:"Server error",
      error:err.message
    })
  }
}

   
