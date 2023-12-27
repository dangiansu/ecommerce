const User = require('../model/usermodel')
var jwt = require('jsonwebtoken');
exports.auth = async (req,res,next)=>{
try{
        let token = req.headers["authorization"].split(" ")[1]
        let decode = jwt.verify( token, process.env.PRIVATEKEY)
        req.user = decode
        next();
    }
    catch(err){
        console.log("-->",err)
        return  res.status(401).json({
            msg:"User not authenticated",
            solution:"Please provide valide token in hearders"
        })
    }

}
exports.isAdmin = async (req,res,next)=>{
    try{
        const {_id}= req.user
        const adminuser = await User.findById(_id)
        if(adminuser.role !=='admin'){
            return res.status(401).json({
                msg:'YOU are not a admin '
            })

        }
        next();

    }
    catch(err){
        console.log('--->',err);
        return res.status(500).json({
            msg:err.message
        })

    }
}
