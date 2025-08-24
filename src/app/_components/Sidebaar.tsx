
"use client"
import { usePersonalStore } from '@/store/store'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_ENDPOINTS } from "@/config/api";
import LoadingBar from 'react-top-loading-bar';
import {  SidebarClose, SidebarIcon, SidebarOpen } from "lucide-react";
import { Badge } from '@/components/ui/badge';

import Link from 'next/link';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import Logout from './Logout';


const Sidebaar = () => {
  
  const userInfo = usePersonalStore((state:any) => state.user);
  const setUserInfo = usePersonalStore((state:any) => state.updateUser);
  const setProjectInfo = usePersonalStore((state:any) => state.updateProject);
  const [progress , setProgress] = useState(0);
  const [Sidebaar , setSidebar] = useState(true);


  const findUserInfo =  async () => {
    try{
      if(!userInfo){
            setProgress(20);
            console.log("Fetching user info from:", API_ENDPOINTS.user.getUserInformation);
            const information = await axios.get(API_ENDPOINTS.user.getUserInformation);
            setProgress(80);
            setUserInfo(information.data?.userDetails);
            setProjectInfo(information.data?.userDetails.project);
            console.log("information", information);
            setProgress(100);
      }
    }catch(error){
        console.error("Error fetching user info:", error);
    }
  }

   
  useEffect(() => {
    findUserInfo();
  } , []);
  if(!userInfo){
  return <div className={` relative w-[300px] h-full p-5 flex flex-col gap-4 border-r-[0.5px] border-r-gray-400 bg-white dark:bg-gray-900 ${Sidebaar ? 'block': 'hidden'}`}>
     <li className="w-[70%] mt-7 h-8 list-none bg-gray-200 rounded-full dark:bg-gray-700"></li>
     <li className="w-full mt-2 list-none h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
     <li className="w-full mt-2 list-none h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
     <li className="w-full mt-2 list-none h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
     {
       <SidebarClose className="absolute right-2 text-gray-700 dark:text-gray-200 size-6 cursor-pointer hover:text-gray-900"  onClick={()=>setSidebar(false)} />
     }
     {
       <SidebarOpen className={`${Sidebaar ? ' hidden ':' block'}absolute left-2 top-2 text-gray-700 dark:text-gray-200 size-6 cursor-pointer hover:text-gray-900`}  onClick={()=>setSidebar(true)} />
     }
    </div>
 } 
  return (
    <>
       <LoadingBar
        color='#3377ff'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />  
        {
       <SidebarOpen className={`${Sidebaar ? ' hidden ':' block'}absolute left-2 top-2 text-gray-700 dark:text-gray-200 size-6 cursor-pointer hover:text-gray-900`}  onClick={()=>setSidebar(true)} />
        }
      <div className= {`h-[100vh]  w-[300px] p-5 border-r-gray-500 dark:border-r-gray-700 border-r-[1.3px] flex flex-col justify-between bg-white dark:bg-gray-900 ${Sidebaar ? 'block': 'hidden'} `}>
          <div>
        <div className="flex  w-full justify-between items-center">
          <div className="flex items-center gap-2 m-5 ">
            <h1 className="text-[20px] font-[600] ">Draw</h1>
            <div>
              <Badge>{userInfo?.plan}</Badge>
            </div>
          </div>
          {
            <SidebarClose className="text-gray-700 dark:text-gray-200 size-6 cursor-pointer hover:text-gray-900"  onClick={()=>setSidebar(false)} />
          }
        </div>
        <ul className="space-y-1">
          <li>
            <Link
              href="/dashboard/projects"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-300 hover:bg-opacity-30 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>

              <span className="text-sm font-medium"> Projects </span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/plans"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-300 hover:bg-opacity-30 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>

              <span className="text-sm font-medium"> Plans </span>
            </Link>
          </li>
           <Logout/>
        </ul>
      </div>

      
          
      </div>
    </>
  )
}

export default Sidebaar