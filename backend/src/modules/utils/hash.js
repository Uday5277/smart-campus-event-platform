import bcrypt from 'bcrypt';
import pool from '../../config/db.js';
const saltRounds = 10;

const HashPassword = async (password)=>{
    try{
    const hash = await bcrypt.hash(password,saltRounds);
    return hash;
}catch(err){
    console.log(err.message);
    throw err;
}
};

const ComparePassword = async (password,hash)=>{
    return await bcrypt.compare(password,hash);
};

export {HashPassword,ComparePassword};
