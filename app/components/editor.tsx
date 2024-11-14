import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css"; // Import Quill's CSS

type QuillEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const QuillEditor = ({ value, onChange }: QuillEditorProps) => {
  const quillRef = useRef<HTMLDivElement>(null);
  const [quillEditor, setQuillEditor] = useState<any>(null); // Store Quill instance in state
  
  useEffect(() => {
    // Only load Quill in the browser (window is available only in the browser)
    console.log(quillEditor)
    if (typeof window !== "undefined" && !quillEditor) {
      import("quill").then((module) => {
        const Quill = module.default || module; // Get the correct Quill reference
        console.log("Renderssss")
        // Initialize Quill editor
        if (quillRef.current) {
          const editor = new Quill(quillRef.current, {
            theme: "snow",
            modules: {
              toolbar: [
                [{ header: "1" }, { header: "2" }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["bold", "italic", "underline"],
                ["link"],
                ["image"],
                ["blockquote"],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
                ["code-block"],
              ],
            },
          });

          // Set Quill instance in the state
          setQuillEditor(editor);
          const toolbars = document.querySelectorAll(".ql-toolbar");
         toolbars.forEach((toolbar,index) => {
          if (index != toolbars.length - 1) {
            (toolbar as HTMLElement).style.display = "none";
          }})
  
          // Set initial content
          editor.root.innerHTML = value;
        
          // Listen for text changes and update parent state
          editor.on("text-change", () => {
            const updatedValue = editor.root.innerHTML;
            console.log(updatedValue)
            if (updatedValue !== value) {
              onChange(updatedValue); // Update the value in the parent component
            }
          });
        }
      }).catch((error) => {
        console.error("Error loading Quill:", error);
      });
    }
    // Cleanup function to destroy Quill instance on component unmount
    return () => {
      if (quillEditor) {
        // quillEditor.off("text-change");
        // setQuillEditor(null);
      }
    };
  }, [quillEditor, value, onChange]); // Only run effect when `quillEditor`, `value`, or `onChange` changes

  return <div ref={quillRef} style={{ minHeight: "200px" }} />;
};

export default QuillEditor;
