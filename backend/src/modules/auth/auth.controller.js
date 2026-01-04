import { CreateUser,GetUsersByEmail } from "./auth.service.js";
import { ComparePassword } from "../utils/hash.js";
import { GenerateToken } from "../utils/jwt.js";

const register = async (req,res,next)=>{
    try{
        const{userName,email,password,role} = req.body;
        if(!userName || !email || !password || !role){
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        const existingUser = await GetUsersByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }

        const userId = await CreateUser(userName,email,password,role);

        res.send(201).json({
            message:"User registered successfully",
            userId: userId
        });

    }catch(err){
        console.log('Registeration controller error:',err.message);
        next(err);
    }
};

const login = async (req,res,next)=>{
    try{
        const{email, password} = req.body;
        if(!email || ! password){
            return res.status(400).json({ message: "Email and Password are required" });
        }

        const user = await GetUsersByEmail(email);

        const isMatch = user ? await ComparePassword(password,user.password_hash) : false;
        if(!isMatch){
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = await GenerateToken(user.user_id,user.role);

        return res.status(200).json({
            message: "Login Successfull",
            token,
            user:{
                id:user.user_id,
                name:user.name,
                role:user.role
            }
        })

    }catch(err){
        console.log("Login Controller error: ", err.message);
        next(err);
    }
};

export {register,login} ;