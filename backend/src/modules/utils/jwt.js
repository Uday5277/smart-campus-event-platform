import jwt from 'jsonwebtoken';

const GenerateToken = (userId,role)=>{
    return jwt.sign(
        {id: userId,
         role: role
        },
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );
};

const VerifyToken = (jwtToken)=>{
    try{
        const decoded = jwt.verify(jwtToken,process.env.JWT_SECRET);
        return decoded;

    }catch(err){
        console.log(err.message);
        throw err;
    }
}

export {GenerateToken,VerifyToken};