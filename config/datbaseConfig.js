import mongoose from "mongoose";

const dbConnection=async()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("--Database Connected--");
    } catch (error) {
        console.log("Databse Error:",error);
        process.exit(1);
    }
}

export default dbConnection;