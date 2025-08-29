"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeftCircle, Save, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {ResizableHandle,ResizablePanel,ResizablePanelGroup,} from "@/components/ui/resizable";
import WhiteBoard from '@/_components/WhiteBoard';
import Api_Connector from '@/config/api_connector/api_connectot';
import { API_ENDPOINTS } from '@/config/api';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

interface EditorProps {
  defaultBlock: any;
  setDocumentfile: (blocks: any) => void;
}

const page = () => {
  
   
  const params : any = useParams();
  const [DBDocumentfile , setDbDocumentfile] = useState(null);
  const [whiteBoardFile , setWhiteboardfile] = useState(null); 
  const [documentFile , setDocumentFile] = useState(null);
  const [DbFiles , setDbFiles] = useState(null);
  const [DbWhiteBoardFile , setDbWhiteBoardFile] = useState(null);
  // const [saveFiles , setSaveFiles] = useState(null);
  
  function saveFiles(){
    
  }
  
  
  async function getFiles(){
    try{

      console.log("apiurl" ,`${API_ENDPOINTS.project.getProject}/projectId=${params.fieldId}`)
      const getProjectFile = await Api_Connector("GET" , `${API_ENDPOINTS.project.getProject}/?projectId=${params.fieldId}` , "" , "" , "");
      console.log("getYpurProject" , getProjectFile);
      setDbFiles(getProjectFile.data.file);
      if(getProjectFile.data.file.whiteboard.length == 0 ||  getProjectFile.data.file.whiteboard.length == 0) return;

      // setDbDocumentfile();

    }catch(error){
      console.log('error while hitting the api');
    }
  } 

  useEffect(() => {
    // console.log(params);
    getFiles();
    
  } , []);
  
  useEffect(() => {
    console.log("whiteBoardFile" , whiteBoardFile);
  } , [whiteBoardFile]);
  
      
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
             
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-gray-500 dark:bg-gray-300"/>
        <ResizablePanel>
          <WhiteBoard
            defaultBlock={DbWhiteBoardFile}
            setWhiteboardfile={setWhiteboardfile}
          /> 
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default page