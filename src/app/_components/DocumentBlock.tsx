"use client";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect } from "react";

export default function DocumentBlock({setDocumentfile , defaultBlock} : any) {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent : defaultBlock ? defaultBlock : [
      {
        type: "paragraph",
        content: "Welcome to DOODLE_DRAW !",
      }
    ] 
  })

  // useEffect(() => {
  //   console.log(editor?.document);
  // } ,[]);
    
  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} />;
}
