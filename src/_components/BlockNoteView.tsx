import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

export default function BlockNoteEditor({defaultBlock , setDocumentFile} : any) {

    const editor = useCreateBlockNote({
    initialContent : defaultBlock ? defaultBlock : [
      {
        type: "paragraph", 
        content: "Welcome to Doodle_DRAW !",
      }
    ]
  });
  
  const onChange = () => {
    const document = editor.document;
    setDocumentFile(document)
  }
   
  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} onChange={onChange}/>;
}
 