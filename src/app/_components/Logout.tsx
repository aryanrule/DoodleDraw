'use client'
import React from 'react'
import CostumAlertDialog from './AlertDialog'
import { Button } from '@/components/ui/button'
import { LogOut } from "lucide-react";

const Logout = () => {
  return (
              
    <>
      <CostumAlertDialog 
       title={' Are you sure you want to log out?'}
       dialogDescription={'Logging out will end your current session and require you to sign in again to access your account.'}
       logout={true}
      >
        <Button
          variant="ghost"
          className="ml-1 w-full justify-start gap-2 text-gray-700 dark:text-gray-300 hover:!bg-gray-300 hover:bg-opacity-30 hover:text-gray-800"
        >
          <LogOut className="size-[16px] text-gray-600 dark:text-gray-300" /> Log out
        </Button>
      </CostumAlertDialog>
    </>
  )
}

export default Logout