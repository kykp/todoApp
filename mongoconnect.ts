import mongoose from "mongoose";

async function startBaseMongo() {
  const uri =
    "mongodb+srv://kykp:VYFFvDBVwrRPnGHr@cluster0.xtwcw.mongodb.net/Users?retryWrites=true&w=majority";
  try {
    console.log("успешное подключение к БД");
    mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
}

export {startBaseMongo};
