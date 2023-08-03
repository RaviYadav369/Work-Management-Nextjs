import mongoose from "mongoose";

export const connetToDB = async () => {
     try {
       await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"Test-Database",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("Connect to DB ");
        
     } catch (error) {
        console.log(error);
     }
}