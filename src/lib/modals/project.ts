import mongoose, { Schema } from "mongoose";
import { models } from "mongoose";


const projectSchema = new Schema({
    filename : {
        type : String , 
        required:true  , 
    } , 
    whiteboard :{
        type : String , 
    } , 
    document : {
        type : String ,   
     } , 
     createdBy : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "user" , 
     }
});


const File = models?.file || mongoose.model('file' , projectSchema);
export default File;