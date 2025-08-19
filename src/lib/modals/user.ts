import mongoose, { models, Schema } from "mongoose";

const userSchema = new Schema({
     username :{
        type :String  , 
        required : true , 
     } ,
     email: {
        type :String , 
        required : true ,
     }  , 
     kindeId : {
          type :String , 
        required : true ,
     } , 
     picture : {
        type : String ,
     } , 
     plan : {
        type : String , 
        enum : ['premium' , 'free'] , 
        require:true , 
     } , 
     project:[{
        fileId: {
            type : Schema.Types.ObjectId 
        } , 
        fileName : {
            type : String ,  
        } , 
        userName : {
            type : String , 
        }  , 
        createdAt : {
            type : Date, 
            default : Date.now() 
        }
     }]
});


const User = models?.user || mongoose.model("user" , userSchema);
export default User ;
