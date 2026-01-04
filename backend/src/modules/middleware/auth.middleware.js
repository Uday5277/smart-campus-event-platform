import { VerifyToken } from "../utils/jwt.js";

const authenticate = async (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization || req.headers.Authorization;
        console.log("Headers received:", req.headers); 
        console.log("Auth Header:", req.headers.authorization);

        if (!authHeader || !/^bearer /i.test(authHeader) ) {
            console.log("Validation failed for header:", authHeader);
          return res.status(401).json({ 
              success: false, 
              message: "Access denied. No valid token provided." 
        });
      }

        const token = authHeader.split(' ')[1];

        const decoded = VerifyToken(token);

        req.user = decoded;

        next();

    }catch(err){
        console.log("Auth Middleware Error: ",err.message);
        next(err);
    }
}

export default authenticate;