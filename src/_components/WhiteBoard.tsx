'use client'
// import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import dynamic from 'next/dynamic';
import "@excalidraw/excalidraw/index.css";
import { useEffect } from 'react';
const Excalidraw = dynamic(
    async () => (await import("@excalidraw/excalidraw")).Excalidraw , {ssr : false}
);

const WelcomeScreen = dynamic(
    async () => (await import("@excalidraw/excalidraw")).WelcomeScreen  , {ssr : false}

)
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




// const WelcomeScreenToolbar = dynamic(
//     async () => (await import("@excalidraw/excalidraw")).WelcomeScreen.Hints.ToolbarHint , {ssr : false}

// )
// const MainMenu = dynamic(
//     async () => (await import("@excalidraw/excalidraw")).MainMenu , {ssr : false}
// )
// const WelcomeCenter = dynamic(
//     async () => (await import("@excalidraw/excalidraw")).WelcomeScreen.Center , {ssr : false}

// );
// const WelcomeScreenCenterHeading =  dynamic(
//     async () => (await import("@excalidraw/excalidraw")).WelcomeScreen.Center.Heading , {ssr : false}

// );

// const WelcomeScreenHintsMenuHint = dynamic(
//     async () => (await import("@excalidraw/excalidraw")).WelcomeScreen.Hints.MenuHint , {ssr : false}
// );

// const MainMenuDefaultClearCanvas =  dynamic(
//     async () => (await import("@excalidraw/excalidraw")).MainMenu.DefaultItems.ClearCanvas , {ssr : false}
// );

// const MainMenuDefaultItemsHelpHelp = dynamic(
//      async () => (await import("@excalidraw/excalidraw")).MainMenu.DefaultItems.Help , {ssr : false}
// )

// const MainMenuDefaultItemsChangeCanvasBackground = dynamic(
//       async () => (await import("@excalidraw/excalidraw")).MainMenu.DefaultItems.ChangeCanvasBackground , {ssr : false}
// )