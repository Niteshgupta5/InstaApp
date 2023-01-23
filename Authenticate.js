import jwt from 'jsonwebtoken';
import RegisterSchemaModel from './Schemas/RegisterSchema.js';

const Authenticate = async (req,res,next)=>{

    try {
        const token = req.cookies.instaapp;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await RegisterSchemaModel.findOne({_id : verifyToken._id, "tokens.token": token});
        if(!rootUser){
             res.clearCookie('instaapp',{path:"/", httpOnly : true,secure: true,sameSite : "none",})
             res.status(401).send({msg : "Unauthorized: No token provided"})
            };

        req.token = token;
        req.rootUsername = rootUser.username;
        //req.userID = rootUser._id;
        next();
        
    } catch (err) {
        res.clearCookie('instaapp',{path:"/", httpOnly : true,secure: true,sameSite : "none",})
        res.status(401).send({msg : "Unauthorized: No token provided"});
    }
};

export default Authenticate;