import { toast } from "sonner";
import Api_Connector from "./config/api_connector/api_connectot";
import { API_ENDPOINTS } from "./config/api";


export const ProcessPayment = async (userInfo : any , updateUser :(user : any ) => void , setProgress : (progress : number) => void )  => {
   //   console.log(userInfo);
     setProgress(10);
     if(!userInfo){
        setProgress(100);
        toast("try again after login");
        return ;
     }
     if(userInfo?.plan == "premium"){
        setProgress(100);
        toast("you are already enjoying our premium plan");
        return;
     }
     setProgress(20);
     const createOrderId = async (userId:string) => {
         try {
            const order_res : any = await Api_Connector("POST" , API_ENDPOINTS.payments.createOrder , {userId : userId}  , "" , "");
            console.log(order_res); 
            if(!order_res){
               toast("oops!");
               return ;
            } 
            return order_res?.data; 
         }catch(error){
            console.log(error);
            throw new Error('Network response was not ok');
         }
     }



     try { 
        const order = await createOrderId(userInfo?._id);
        console.log(order);
        const options  = {
              key : process.env.key_id! , 
              amount : order?.amount , 
              currency : order?.currency , 
              order_id : order?.id , 
              name : "doodle_draw"  , 
              description:'Thank You for upgrading your plan.',
              image : 'https://d6xcmfyh68wv8.cloudfront.net/assets/razorpay-glyph.svg' , 
              prefill:{
              name : `${userInfo.username}`,
              email:userInfo.email,}  , 
              handler : async function  (res : any) {
                  verifyPayment(res);                 
              }               
         }

         const verifyPayment = (res :any) => {
            const data = {
               
            }
         }
         
      }catch(err){
       console.log(err);
       toast("payment not able to process");
     }
}