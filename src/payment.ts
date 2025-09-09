import { toast } from "sonner";
import Api_Connector from "./config/api_connector/api_connectot";
import { API_ENDPOINTS } from "./config/api";

export const ProcessPayment = async (
  userInfo: any,
  updateUser: (user: any) => void,
  setProgress: (progress: number) => void
) => {
  //   console.log(userInfo);
  setProgress(10);
  if (!userInfo) {
    setProgress(100);
    toast("try again after login");
    return;
  }
  if (userInfo?.plan == "premium") {
    setProgress(100);
    toast("you are already enjoying our premium plan");
    return;
  }
  setProgress(20);
  const createOrderId = async (userId: string) => {
    try {
      const order_res: any = await Api_Connector(
        "POST",
        API_ENDPOINTS.payments.createOrder,
        { userId: userId },
        "",
        ""
      );
      console.log(order_res);
      if (!order_res) {
        toast("oops!");
        return;
      }
      return order_res?.data;
    } catch (error) {
      console.log(error);
      throw new Error("Network response was not ok");
    }
  };

  try {
    const order_response = await createOrderId(userInfo?._id);
    if (!order_response) {
      toast("Unable to create order. Try again.");
      return;
    }
    const order = order_response?.order;
   
    const options = {
      key: process.env.NEXT_PUBLIC_RAZPAY_KEY_ID!,  
      amount: order?.amount,
      currency: order?.currency,
      order_id: order?.id,
      name: "doodle_draw",
      description: "Thank You for upgrading your plan.",
      image: "https://d6xcmfyh68wv8.cloudfront.net/assets/razorpay-glyph.svg",
      prefill: {
        name: `${userInfo.username}`,
        email: userInfo.email,
      },
      handler:function (res: any) {
        verifyPayment({res});
      },
    };
    setProgress(70);
    const verifyPayment = async (res: any) => {
      const response = res.res;  
      console.log("res" , response);    
      const data = {
        orderCreationId: order?.id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
        userId : userInfo?._id ,
      };
      // one point if result is not ok
      try {
        const result = await Api_Connector(
          "POST",
          API_ENDPOINTS.payments.verifyPayment,
          data,
          "",
          ""
        );
        if (!result) throw new Error("Verification failed");
        console.log("result" , result);  
        updateUser(result?.data?.updatedUser);  
      } catch (err) {
        console.error(err);
        toast("Payment verification failed.");
      }
    }; 

    setProgress(100);
    console.log("hello");
    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response: any) {
      alert("Payment failed. Please try again.");
      console.log(response);
    });
  } catch (err) {
    console.log(err);
    toast("payment not able to process");
  }
};
