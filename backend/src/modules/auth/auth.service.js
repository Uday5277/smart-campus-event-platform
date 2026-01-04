import pool from '../../config/db.js';
import { HashPassword } from '../utils/hash.js';

const CreateUser = async (userName,email,passwordHash,role)=>{
    try{
        const hashedPassword = await HashPassword(passwordHash);
        const result = await pool.query('INSERT INTO users(name,email,password_hash,role) VALUES($1,$2,$3,$4) RETURNING user_id',[userName,email,hashedPassword,role]);
        return result.rows[0].user_id;
    }catch(err){
        console.log(err.message);
        throw err;
    }
};

const GetUsersByEmail = async (email)=>{
    try{
    const result = await pool.query('SELECT * FROM users WHERE email = $1',[email]);
    if(result.rows.length>0){
        return result.rows[0];
    }else{
        return null;
    }
    }catch(err){
        throw err;
    }

};

export {CreateUser,GetUsersByEmail};