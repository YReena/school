const jwt = require("jsonwebtoken");
const { Admin } = require('../model/studSchema');


const authenication = async( req , res,next)=>{
 try{
    console.log(req, "reena");
    const token = req.headers.authorization;
    console.log(token);
    const verifyToken = jwt.verify(token , process.env.SCRET_KEY);
    console.log(verifyToken);

    const rootAdmin = await Admin.findOne({_id:verifyToken._id , "tokens.token": token});
    if(!rootAdmin){
        throw new Error("admin not found");
    }

    req.token = token;
    req.rootAdmin = rootAdmin ;
    req.adminID   =  rootAdmin;

    next();
 }
 catch(err){
    res.status(401).send('unauthorized admin');
    console.log(err);
 }
}
module.exports = authenication ;