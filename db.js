import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config( { path: './config.env' });
const url = process.env.DATABASE ;
mongoose.set('strictQuery', false);
mongoose.connect(url,{
  useNewUrlParser: true,
}).then(()=>{
    console.log("connection successful");
  }).catch((err)=> console.log("no connection"));
