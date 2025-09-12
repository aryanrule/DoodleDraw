'use client'
// import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import dynamic from 'next/dynamic';
import "@excalidraw/excalidraw/index.css";
import { useEffect } from 'react';
const Excalidraw = dynamic(
    async () => (await import("@excalidraw/excalidraw")).Excalidraw , {ssr : false}
);
const WhiteBoard = ({ defaultBlock ,setWhiteboardfile}:any) => {
  
  

  return (
    <>
      <Excalidraw
        initialData={{
          elements : defaultBlock ? defaultBlock : null , 
        }}
        onChange={(excalidrawElements, appState, files)=> setWhiteboardfile(excalidrawElements)}

      />
    </>
  );
};

export default WhiteBoard;



