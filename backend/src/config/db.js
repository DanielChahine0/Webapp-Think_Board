import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI); // Uses environment variable so the credentials aren't hard coded
        console.log("MONGODB CONNECTED SUCCESSFULLY"); 
    } 
    catch (error){
        console.error("Error connecting to MONGODB", error);
        throw error; // bubble up, maybe it can be caught later. If not easier for debugging 
    }
}