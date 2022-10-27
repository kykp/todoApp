var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();
const mongoPassword = process.env.MONGO_PASS;
const mongoLogin = process.env.MONGO_LOGIN;
function startBaseMongo() {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = `mongodb+srv://${mongoLogin}:${mongoPassword}@cluster0.xtwcw.mongodb.net/Users?retryWrites=true&w=majority`;
        try {
            console.log("успешное подключение к БД");
            mongoose.connect(uri);
        }
        catch (error) {
            console.log(error);
        }
    });
}
export { startBaseMongo };
