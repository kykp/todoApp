import mongoose from "mongoose";
import * as dotenv from 'dotenv'  
dotenv.config()
const mongoPassword = process.env.MONGO_PASS;
const mongoLogin = process.env.MONGO_LOGIN;

async function startBaseMongo() {
  const uri =
    `mongodb+srv://${mongoLogin}:${mongoPassword}@cluster0.xtwcw.mongodb.net/Users?retryWrites=true&w=majority`;
  try {
    console.log("успешное подключение к БД");
    mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
}

export {startBaseMongo};
