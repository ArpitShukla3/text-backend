import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const options={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
async function dataBaseConnect(){
     //connecting with hotel database
     const Url= process.env.Url;
     try { 
       const conn= await mongoose.connect(Url)
        console.log("connected to :",conn.connection.host);
    } catch (error) { 
        console.log("Error occurred due to  "+error);
        process.exit();
    }
      
} 
dataBaseConnect();
export default dataBaseConnect;