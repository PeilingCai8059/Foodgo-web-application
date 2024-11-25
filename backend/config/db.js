import mongoose from "mongoose";

const uri = "mongodb+srv://<username>:<password>@cluster0.zfruq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



export const connectDB= async() => {
    await mongoose.connect(uri).then (() => console.log("DB connected"));
}
