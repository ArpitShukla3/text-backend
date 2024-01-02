import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
async function dataBaseConnect() {
    const Url = process.env.Url;
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2")
        console.log("connected to :", conn.connection.host);
    } catch (error) {
        console.log("Error occurred due to  " + error);
        process.exit();
    }

}
dataBaseConnect();
export default dataBaseConnect;