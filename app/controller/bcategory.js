const Bcategory = require('../model/bcategorymodel')

// create blog category api's here -->

exports.bcreatecategory = async(req,res)=>{
    try{
       const category = req.body
       const addcategory = await Bcategory.create(category)
       if(!addcategory){
           return res.status(404).send({
               msg:"Not found",
               success:false
           })
       }
       return res.status(200).send({
           msg:"Category added successfully",
           success:true,
           data: addcategory
       })
   
    }
    catch(err){
       return res.status(500).send({
           msg:"Servr error",
           error: err.message
       })
    }
   }
   
   //update blog category api's here -->
   
exports.bupdatecategory = async(req,res)=>{
       try{
           console.log('a')
          const {id} = req.params
          const {title} = req.body
          const updatecategory = await Bcategory.findByIdAndUpdate(id,{title},{new:true})
          console.log("-->",updatecategory)
          if(!updatecategory){
           return res.status(404).send({
               msg:"category not found",
               success:true
           })
          }
          return res.status(200).send({
           msg:"Category updated successfully",
           success: true,
           data:updatecategory
          })
       }
       catch(err){
          return res.status(500).send({
           msg:"Server error",
           error:err.message
          })
       }
   }
   
   //delete blog category api's here -->
   
exports.bdeletecategory = async(req,res)=>{
       try{
        const {id} = req.params
        const deletecategory = await Bcategory.findByIdAndDelete(id)
        if(!deletecategory){
           return res.status(404).send({
               msg:"Category not found",
               success:false,
   
           })
        }
   
        return res.status(200).send({
           msg:"Category deleted successfully",
           success:true,
           data:deletecategory
        })
        
       }
       catch(err){
           return res.status(500).send({
               msg:"Server error",
               error: err.message
           })
       }
   }
   
   //getall blog category api's here -->
   
exports.bgetallcategory = async(req,res)=>{
       try{
         const getallcategory = await Bcategory.find()
         if(!getallcategory){
           return res.status(404).send({
               msg:"Category not found",
               success:false
           })
         }
         return res.status(200).send({
           msg:"AllCategory get successfully ",
           success:true,
           data:getallcategory
         })
       }
       catch(err){
   
       }
   }
   
   //get blog categoroy api's here --> 
   
exports.bgetcategory = async(req,res)=>{
       try{
         const {id} = req.params
         const getcategory = await Bcategory.findById(id)
         if(!getcategory){
           return res.status(404).send({
               msg:"Category not found",
               success:false
           })
         }
         return res.status(200).send({
           msg:"Category found successfully",
           success:true,
           data:getcategory
         })
       }
       catch(err){
          return res.status(500).send({
           msg:"Server error",
           error: err.message
          })
       }
   }