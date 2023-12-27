const User = require('../model/usermodel')
const Cart = require('../model/cartmodel')
const Product = require('../model/productmodel')
var jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const isvalideid = require('../util/validet')
  
  //register Api here
exports.register = async (req, res)=>{
      try {
        const { fullname, email, password, mobile } = req.body;
    
        // Check for missing fields
        if (!fullname || !email || !password || !mobile) {
          return res.status(400).json({
            msg: 'All fields are required',
          });
        }
    
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(409).json({
            msg: 'User already exists',
            suggestion: 'Please use a different email address',
          });
        }
        const existingcontect = await User.findOne({mobile})
        if(existingcontect){
          return res.status(201).json({
            msg:"This mobile number is already exists",
            suggestion:"Please use a different mobile number"
          })
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 8);
    
        // Create a new user
        const newUser = new User({
          fullname,
          email,
          password: hashedPassword,
          mobile,
        });
    
        // Save the user to the database
        await newUser.save();
    
        return res.status(201).json({
          msg: 'User registration successful',
          success: true,
          user: newUser,
        });
      } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({
          msg: 'Server error',
        });
      }
    }
  //login Api here

exports.login = async (req, res) => {
     try {
       const { email, password } = req.body;
  
//       // Check for missing email or password
      if (!email || !password) {
        return res.status(400).json({
          msg: 'Both email and password are required',
          success: false,
          status: 400,
        });
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({
          msg: 'User not found. Please register first.',
          success: false,
          status: 404,
        });
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password,user.password );
  
      if (!isPasswordValid) {
        return res.status(401).json({
          msg: 'Incorrect password',
          success: false,
          status: 401,
        });
      }
      // Generate a JWT token
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.fullname,
          role: user.role
        },
        process.env.PRIVATEKEY
      );
  
      return res.status(200).json({
        status: 200,
        success: true,
        token
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({
        msg: 'Server error',
        status: 500,
      });
    }
  };

// exports.Adminlogin = async function(req,res){

//    try{
//       const {email,password} = req.body
//       const findadmin = await User.findOne(email)
//       if(!findadmin.role =='admin'){
//         return res.status(404).send({
//           msg:"YOU are not a Admin",
//           success:false
//         })
//       }
//       else{
//         const isPasswordValid = await bcrypt.compare(password,findadmin.password );
  
//         if (!isPasswordValid) {
//           return res.status(401).json({
//             msg: 'Incorrect password',
//             success: false,
//             status: 401,
//           });
//         }
//         return res.status(200).json({
//           status: 200,
//           success: true,
//           token
//         });
//       }
//    }
//    catch(err){
//     console.log('-->',err)
//     return res.status(500).json({
//       msg:"Server error",
//       success:false
//     })
     
//    }

// }
  //update user profile


  exports.updateuser = async (req, res) => {
    const { fullname, mobile } = req.body;
    if(!fullname && !mobile){
      return res.status(404).json({
        success: false,
        msg:"Please enter a field"
      })
    }
    const updates = { fullname, mobile };
    
  
    try {
      const userId = { _id: req.user._id };
  
      const updatedUser = await User.findOneAndUpdate(userId, updates, {
        new: true,
        projection: { password: 0, email: 0 },
      });
  
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "User updated successfully.",
        user: updatedUser,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Server error. Unable to update the user.",
      });
    }
  };
  //getalluser Api here
exports.getallusers = async (req, res) => {
    try {
      const allUsers = await User.find();
  
      if (!allUsers || allUsers.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No users found.",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Users retrieved successfully.",
        users: allUsers,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Server error. Unable to retrieve users.",
      });
    }
  };
  //get single  user
exports.getuser = async (req, res) => {
    try {
      const userId = req.user._id;
  
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is missing or invalid.",
        });
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "User retrieved successfully.",
        user,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Server error. Unable to retrieve user.",
      });
    }
  };
  //delete user
exports.userdelete = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is missing or invalid.",
      });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or has already been deleted.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
      deletedUser: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error. Unable to delete the user.",
    });
  }
};
  //blockd user
exports.blockuser = async (req, res) => {
    try {
      const { id } = req.params;
      isvalideid(id)
      // Find and update the user
      const blockedUser = await User.findByIdAndUpdate(
        id,
        { isBlockd: true },
        { new: true }
      );
  
      if (!blockedUser) {
        return res.status(404).json({
          msg: "User not found",
          success: false,
        });
      }
  
      res.status(200).json({
        msg: "User blocked successfully",
        success: true,
        blockedUser
      });
    } catch (err) {
      console.error(err); // Log the error for debugging purposes
  
      return res.status(500).json({
        msg: "Server error",
        success: false,
      });
    }
  };
  //unblock user
exports.unblockuser = async(req,res) =>{
  try {
    const { id } = req.params;
      isvalideid(id)
    // Find and update the user
    const unblocdUser = await User.findByIdAndUpdate(
      id,
      { isBlockd: false },
      { new: true }
    );

    if (!unblocdUser) {
      return res.status(404).json({
        msg: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      msg: "User unblockd successfully",
      success: true,
      unblocdUser
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes

    return res.status(500).json({
      msg: "Server error",
      success: false,
    });
  }
} 

//update password
exports.updatepassword = async(req,res)=>{
  const password = req.body.password
  try{
    if(!password){
      return res.status(404).send({
        msg:"feild is required",
        success:false
      })
    }
      const user = req.user._id
      const finduser = await User.findById(user)
      if(finduser.password === password){
        return res.status(404).send({
          msg:"YOur old and new password is match"
        })

      }
      const hashedPassword = await bcrypt.hash(password, 8); //hash the password
      finduser.password = hashedPassword

      const updatePassword = await finduser.save()
    if(!finduser){
        return res.status(404).send({
        msg:"User not found",
       })
    }
    return res.status(200).send({
       success: true,
       msg:"Password updated successfully",
       updatePassword
    })

  }
  catch(err){
     return res.status(500).send({
      msg:"Server error",
      success:true
     })
  }
}

//forgot password

exports.forgotpassword = async(req,res)=>{
  try{
    const {email} = req.body
    if(!email){
      return res.status(404).send({
        msg:"email is required",
        success: false
      })
    }

  }
  catch(error){
     return res.status(500).send({
      msg:"Server error",
      error: error.message 
     })
  }
}

//get wishlist api's

exports.getwishlist= async(req,res)=>{
  try{
   const {_id} = req.user
   const GEtwishlist = await User.findById(_id).populate('wishlist')
   if(!GEtwishlist){
    return res.status(404).send({
      msg:"not found wishlist",
      success: false
    })
   }
   return res.status(200).send({
    msg:"Wishlist get successfully",
    success:true,
    data:GEtwishlist
   })
  }
  catch(err){

  }
}

//user cart's api's here -->

exports.usercart = async (req, res) => {
  try {
    const { cart } = req.body;
    const { _id } = req.user;
    const products = [];
    const user = await User.findById(_id);
    
    let alreadyInCart = await Cart.findOne({ Orderby: user._id });
    console.log(alreadyInCart)
    
    if (alreadyInCart) {
      for (let i = 0; i < cart.length; i++) {
        const cartProduct = cart[i];
        let existingProduct = alreadyInCart.products.find(
          (product) => product.product.toString() === cartProduct._id.toString()
        );

        if (existingProduct) {
          const counts = cartProduct.count + existingProduct.count;
          console.log('-->c',counts)
          const Price = existingProduct.price * counts;



          await Cart.updateOne(
            { Orderby: user._id, 'products.product': cartProduct._id },

            {
              $set: {
                'products.$.count': counts,

                cartTotal: Price
              }
            }
          );
          const updatedCart = await Cart.findOne({ Orderby: user._id });
          const cartTotal = updatedCart.products.reduce((total, product) => {
            return total + product.price * product.count;
          }, 0);
        
          // Update the cartTotal after the product count update
          updatedCart.cartTotal = cartTotal;
          await updatedCart.save();
        } else {
          let object = {};
          object.product = cartProduct._id;
          object.color = cartProduct.color;
          object.count = cartProduct.count;

          let getprice = await Product.findById(cartProduct._id).select('price').exec();
          object.price = getprice.price;
          products.push(object);
        }
      }

      if (products.length > 0) {
        alreadyInCart.products.push(...products);

        const cartTotal = alreadyInCart.products.reduce((total, product) => {
          return total + product.price * product.count;
        }, 0);

        alreadyInCart.cartTotal = cartTotal;
        await alreadyInCart.save();
      }

      const updatedCart = await Cart.findOne({ Orderby: user._id });
      
      return res.status(200).send({
        msg: "Products added/updated in the cart",
        success: true,
        data: updatedCart
      });
    } else {
      for(i=0 ; i<cart.length; i++){
        let object ={}
        object.product = cart[i]._id
        object.color = cart[i].color
        object.count = cart[i].count

        let getprice = await Product.findById(cart[i]._id).select('price').exec()
        object.price = getprice.price
        products.push(object)
      }
      let cartTotal = 0;
      for(i=0 ; i<products.length ; i++){
      cartTotal = cartTotal + products[i].price * products[i].count
      }
      console.log("price",cartTotal)
   let newCart = await new Cart({
    products,
    cartTotal,
    Orderby:user?._id
   }).save()

   return res.status(200).send({
    msg:"Add to cart successfully",
    success:true,
    data:newCart
   })

    }
    
  } catch (err) {
    console.log("-->", err);
    return res.status(500).send({
      msg: "Server error",
      success: false
    });
  }
}

//get usercart api's here -->

exports.getcart = async (req,res) => {
  const {_id} = req.user
  const findcart = await Cart.findOne({Orderby:_id})
  return res.status(200).send({
    msg:"get successfully ",
    findcart

  })
}

//emptycart cart api's here -->

exports.emptycart = async (req,res) => {
  try{
    const {_id} = req.user
    const user = await User.findById(_id)
    const emptyCart = await Cart.findOneAndRemove({Orderby:user._id})
    return res.status(200).send({
      msg:"empty cart successfully",
      success: true,
      data: emptyCart
    })


  }
  catch(err)
  {
   return res.status(500).send({
    msg:"Error successfully",
    success:false
   })
  }
}

// delete single product in a cart api's -->

exports.deletesingle = async(req,res) => {
  try{
    const { _id } = req.user;
  const pro_id = req.params.id;
  const user = await User.findById(_id);
  
  const cart = await Cart.findOne({ Orderby: _id });

  if (!cart) {
    return res.status(404).send({
      msg: 'Cart not found',
      success: false
    });
  }

  const productIndex = cart.products.findIndex(product => product.id.toString() === pro_id);
  console.log("x",productIndex)

  if (productIndex !== -1) {
    
    if(productIndex == 0){
      const newcart =  await Cart.findOneAndDelete({Orderby:_id});
      console.log("--",newcart)

      return res.status(200).send({
        msg:"cart deleted successfully",
        newcart
      })
  
    }
    else{
      newcart = cart?.products.splice(productIndex, 1); // Remove the product from the cart's products array
      //remaining  logic here
      console.log("-->",cartTotal)
      await cart.save();
    }
    

    return res.status(200).send({
      msg: 'Deleted cart element successfully',
      success: true,
      newcart
    });
  } else {
    return res.status(404).send({
      msg: 'Product not found in cart',
      success: false
    });
  }
  }
  catch(err){
   
  }
}






  