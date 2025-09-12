"use client";
import React  from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { usePersonalStore } from "@/store/store";
import Createfile from "@/_components/Createfile";
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash } from "lucide-react";
import SearchInput from "@/_components/SearchInput";
import CostumAlertDialog from '../../../../_components/AlertDialog';
import { toast } from "sonner";
import Api_Connector from "@/config/api_connector/api_connectot";
import { API_ENDPOINTS } from "@/config/api";
import { ModeToggle } from "@/_components/ThemeToggle";


 
const page = () => {

  const userinfo = usePersonalStore((state) => state.user);
  const projects = usePersonalStore((state) => state.project);
  const updateUserInfo = usePersonalStore((state) => state.updateUser);
  const updateProjectInfo = usePersonalStore((state)=> state.updateProject);
    
  const deleteProject = async (projectId:string , userId : string) => {
      try{
          console.log("just htted deletedProject");
          const Updated_user_deletedProject = await  Api_Connector("DELETE" ,  API_ENDPOINTS.project.deleteProject , {userId : userId , projectId:projectId} , "" , ""); 
          console.log("updateduser" , Updated_user_deletedProject);
          toast("Project deleted");
          updateUserInfo(Updated_user_deletedProject?.data?.userInfo);
          updateProjectInfo(Updated_user_deletedProject?.data?.userInfo?.project);
           
      }catch(error){
        console.log("error while hitting the delete api" , error);
        toast("sorry");
      }
  } 
  return (
    <div>
      <section className="w-full h-20 flex justify-end  items-center">
        <div className="flex flex-row gap-2 items-center">
          <ModeToggle />
          <div>
            <SearchInput />
          </div>
          <Createfile userinfo={userinfo} />
        </div>
      </section>

      <div>
        <h2 className="text-[19px] font-[600] my-3 mx-3">Projects</h2>
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-700 text-sm">
  <thead className="ltr:text-left rtl:text-right">
    <tr>
      <td className="whitespace-nowrap text-[13.5px] px-4 py-2 font-medium text-gray-900 dark:text-gray-300">
        File Name
      </td>
      <td className="sm:block hidden whitespace-nowrap text-[13.5px] px-4 py-2 font-medium text-gray-900 dark:text-gray-300">
        Created at
      </td>
      <td className="whitespace-nowrap text-[13.5px] px-4 py-2 font-medium text-gray-900 dark:text-gray-300">
        Author
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-300"></td>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
    {projects ? (
      projects.length > 0 ? (
        projects.map((data: any, index: any) => (
          <tr key={index} className={index % 2 === 0 ? " dark:hover:bg-gray-900" : " dark:bg-gray-900 dark:bg-opacity-40"}>
          <td className="whitespace-nowrap px-4 py-2 text-[14.2px] font-medium text-gray-800 dark:text-gray-200">
            <Link href={`/workspace/${data.fileId}`}>{data.fileName}</Link>
          </td>
          <td className="sm:block hidden whitespace-nowrap px-4 py-2 text-[13px] text-gray-700 dark:text-gray-400">
            <Link href={`/workspace/${data.fileId}`}>{new Date(data.createdAt).toString().slice(0, 15)}</Link>
          </td>
          <td className="whitespace-nowrap px-4 py-2 text-[13px] text-gray-700 dark:text-gray-400">
            <Link href={`/workspace/${data.fileId}`}>{data.username}</Link>
          </td>
          <td className="whitespace-nowrap px-4 py-2 text-[13px] text-gray-700 dark:text-gray-400">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MoreVertical className="size-5 text-[13.5px]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {/* <DropdownMenuGroup> */}
                  <CostumAlertDialog 
                    logout={false}
                    title={"Delete Project"}
                    dialogDescription={"Are you sure you want to delete this project? This action cannot be undone."}
                    buttonText={'Delete'}
                    buttonOnClick={()=>deleteProject(data.fileId , userinfo?._id)}
                  >
                    <DropdownMenuItem
                     onSelect={(e) => e.preventDefault()}  
                    className='hover:bg-red-200'>
                      <Trash className="size-4 mr-3" />
                      Delete
                    </DropdownMenuItem>
                  </CostumAlertDialog>  
                    
                {/* </DropdownMenuGroup> */}   
              </DropdownMenuContent>
            </DropdownMenu>
          </td>
        </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4} className="text-center">
            No files found
          </td>
        </tr>
      )
    ) : (
      <>
        <tr className="">
          <td className="text-center sm:block hidden">
            <li className="w-full mt-2 list-none h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
          </td>
          <td className="text-center">
            <li className="w-full mt-2 list-none h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
          </td>
          <td className="text-center">
            <li className="w-full mt-2 list-none h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
          </td>
        </tr>
        <tr className="">
          <td className="text-center sm:block hidden">
            <li className="w-full mt-2 list-none h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
          </td>
          <td className="text-center">
            <li className="w-full mt-2 list-none h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
          </td>
          <td className="text-center">
            <li className="w-full mt-2 list-none h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
          </td>
        </tr>
      </>
    )}
  </tbody>
</table>
        </div>
      </div>
    </div>
  );
};

export default page;
