"use server"
import mongoose, { Mongoose } from "mongoose"

const db_url = process.env.MONGODB_URL!;

interface MongoConnection {
    connection : Mongoose | null
    promise : Promise<Mongoose> | null;
}
let cached: MongoConnection = (global as any).mongoose;
if (!cached) {
    cached = (global as any).mongoose = { connection: null, promise: null };
}
const connect_DB =  async () => {
    if(cached.connection){
        return cached.connection;
    }
    if(!db_url){
        console.log("no dbUrl is here");
    }

    try{  
        console.log("db url" , db_url);
        cached.connection = await mongoose.connect(db_url , {bufferCommands: false}) 
    }catch(error){
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

export default connect_DB;