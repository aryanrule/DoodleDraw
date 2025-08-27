"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeftCircle, Save, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import DocumentBlock from '@/app/_components/DocumentBlock';
import {ResizableHandle,ResizablePanel,ResizablePanelGroup,} from "@/components/ui/resizable";
import WhiteBoard from '@/app/_components/WhiteBoard';
import Api_Connector from '@/config/api_connector/api_connectot';
import { API_ENDPOINTS } from '@/config/api';
import { useParams } from 'next/navigation';


const page = () => {
  const params : any = useParams();
  // const [DBwhiteboardfile, DBwhiteboardfile] = useState(null);
  // const [DBDocumefile , setDbDocumentfile] = useState(null);
  // const [whiteBoardFile , setWhiteboardfile] = useState(null); 
  // const [documentFile , setDocumentFile] = useState(null);
   

  function saveFiles(){
    
  }
  
  async function getFiles(){
    try{
      // const getFile = await Api_Connector( "GET" , API_ENDPOINTS.project.getProject , {projectId : params})
    }catch(error){
      console.log('error while hitting the api');
    }
  } 
  useEffect(() => {
    console.log(params);
  } , []);

  return (
     <div className="h-screen ">
      <div className="h-14 border-b-[0.5px] bg-white dark:bg-gray-900 border-b-gray-400 z-50 flex justify-between sm:px-8 px-2">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/projects">
            <ArrowLeftCircle className="hover:text-gray-700 size-6" />
          </Link>
          <h2 className="text-[14px] font-[600]">file name</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => saveFiles()}>
            <Save className="size-5 mr-3" /> Save
          </Button>
        </div>
      </div>
      <ResizablePanelGroup direction="horizontal" className="">
        <ResizablePanel>
          <DocumentBlock
            // savefile={saveFile}
            // defaultBlock={DBdocumentfile}
            // setDocumentfile={setDocumentfile}
          />
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-gray-500 dark:bg-gray-300"/>
        <ResizablePanel>
          <WhiteBoard
            // defaultBlock={DBwhiteboardfile}
            // setWhiteboardfile={setWhiteboardfile}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default page