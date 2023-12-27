 const express = require('express')
 const routes = express.Router()
 const Usercontroller = require('../controller/user')
 const Productcontroller = require('../controller/product')
 const Blogcontroller = require('../controller/blog')
 const PCategorycontroller = require('../controller/pcategory')
 const BCategorycontroller = require('../controller/bcategory')
 const {auth, isAdmin} = require('../middleware/auth')
 const {upload} = require('../middleware/multer')
 const BrandCategorycontroller = require('../controller/brandcategory')
 const Couponcontroller = require('../controller/couponcategory')

 // users routes are here -->

 routes.post('/register',Usercontroller.register);
 routes.post('/login',Usercontroller.login);
//routes.post('/adminlogin',Usercontroller.Adminlogin)
 routes.put('/updateuser',auth,Usercontroller.updateuser);
 routes.get('/getallusers',auth,Usercontroller.getallusers);
 routes.get('/getuser',auth,Usercontroller.getuser);
 routes.delete('/deleteuser',auth,Usercontroller.userdelete);
 routes.put('/blockdeuser/:id',auth,isAdmin,Usercontroller.blockuser);
 routes.put('/unblockdeuser/:id',auth,isAdmin,Usercontroller.unblockuser);
 routes.put('/updatepassword',auth,Usercontroller.updatepassword);
 routes.get('/getwishlist',auth,Usercontroller.getwishlist)
 routes.post('/usercart',auth,Usercontroller.usercart)
 routes.get('/getcart',auth,Usercontroller.getcart)
 routes.delete('/emptycart',auth,Usercontroller.emptycart)
 routes.delete('/deleteelement/:id',auth,Usercontroller.deletesingle)

 // product routes are here -->

 routes.post('/addproduct',upload('image'),auth,isAdmin,Productcontroller.addproduct);
 routes.get('/getproduct/:id',auth,Productcontroller.getproduct);
 routes.get('/getallproducts',auth,Productcontroller.getallproducts);
 routes.delete('/deleteproduct/:id',auth,Productcontroller.deleteproduct);
 routes.put('/updateproduct/:id',upload('image'),auth,isAdmin,Productcontroller.updateproduct);
 routes.put('/wishlist',auth,Productcontroller.wishlist)
 routes.put('/ratings',auth,Productcontroller.ratings)


 
// blog routes are here -->

routes.post('/createblog',auth,isAdmin,Blogcontroller.createblog);
routes.get('/getallblogs',auth,Blogcontroller.getallblogs);
routes.get('/getblogs/:id',auth,Blogcontroller.getblogs)
routes.delete('/deleteblogs/:id',auth,isAdmin,Blogcontroller.deleteblogs)
routes.put('/updatecategory/:id',auth,isAdmin,Blogcontroller.updateblogs)


// product category api's here -->

routes.post('/pcreatecategory',auth,isAdmin, PCategorycontroller.createcategory)
routes.put('/pupdatepcategory/:id',auth,isAdmin,PCategorycontroller.updatecategory)
routes.delete('/pdeletecategory/:id',auth,isAdmin,PCategorycontroller.deletecategory)
routes.get('/pgetallcategory',auth,PCategorycontroller.getallcategory)
routes.get('/pgetcategory/:id',auth,PCategorycontroller.getcategory)

//blogs category api's here -->

routes.post('/bcreatecategory',auth,isAdmin, BCategorycontroller.bcreatecategory)
routes.put('/bupdatepcategory/:id',auth,isAdmin,BCategorycontroller.bupdatecategory)
routes.delete('/bdeletecategory/:id',auth,isAdmin,BCategorycontroller.bdeletecategory)
routes.get('/bgetallcategory',auth,BCategorycontroller.bgetallcategory)
routes.get('/bgetcategory/:id',auth,BCategorycontroller.bgetcategory)

// brand category api's here -->

routes.post('/brandcreatecategory',auth,isAdmin, BrandCategorycontroller.brandcreatecategory)
routes.put('/brandupdatepcategory/:id',auth,isAdmin,BrandCategorycontroller.brandcreatecategory)
routes.delete('/branddeletecategory/:id',auth,isAdmin,BrandCategorycontroller.branddeletecategory)
routes.get('/brandgetallcategory',auth,BrandCategorycontroller.brandgetallcategory)
routes.get('/brandgetcategory/:id',auth,BrandCategorycontroller.brandgetcategory)

//coupon category api's here -->

routes.post('/createdcouponcategory', auth,isAdmin,Couponcontroller.createcoupon)
routes.get('/getallcoupon',auth,isAdmin,Couponcontroller.getallcoupon)
routes.get('/getcoupon/:id',auth,isAdmin,Couponcontroller.getcoupon)
routes.delete('/deletecoupon/:id',auth,isAdmin,Couponcontroller.deletecoupon)
routes.put('/updatecoupon/:id',auth,isAdmin,Couponcontroller.updatecoupon)

 module.exports = routes