'use client'
import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";


//using the same for deletion as well as logout
const CostumAlertDialog = ({
  logout , 
  buttonText,
  buttonOnClick,
  title,
  dialogDescription,
  children  ,
}: {
  logout?: boolean;
  buttonText?: string;
  buttonOnClick?: () => void;
  title?: string;
  dialogDescription?: string;
  children : React.ReactNode
}) => {

  return (
  <>
  <AlertDialog>
  <AlertDialogTrigger asChild>
       {children}
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>{title}</AlertDialogTitle>
      <AlertDialogDescription>
         {dialogDescription}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
        {
           logout ? (
             <AlertDialogAction> 
                <LogoutLink> Logout </LogoutLink>
              </AlertDialogAction>
           ) : 
           (<AlertDialogAction >
                 {buttonText}
           </AlertDialogAction>)
        }
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  </>
);

};

export default CostumAlertDialog;
