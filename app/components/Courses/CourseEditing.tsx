import { ICourse } from "~/axios/Courses";
import QuillEditor from "../editor";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";

export default function CourseInput({week, setWeek, submit} :{week: ICourse["weeks"][0]; submit:()=> void; setWeek:React.Dispatch<React.SetStateAction<ICourse["weeks"][0] | null | undefined>>}){
   const [value, setValue] = useState("")
   const [activeTab, setActiveTab] = useState<"notes" | "slides" | "video">("notes")

const handleEditorChange = (change: any) => {
        setWeek((prev) => prev ? ({...prev, notes: change}) : prev)
        console.log(week)
    }
   return (
    <section className="flex flex-col gap-4">
    <div className="flex mt-30 justify-end">
        <button onClick={submit} className="bg-blue-700 text-white px-4 py-2 rounded-md">Save</button>
      </div>
        <input
        className="text-2xl hover:border-b py-2 text-black  font-semibold bg-transparent focus:outline-none"
        value={week?.topic}
        placeholder="Add Course"
        onChange={(e) => setWeek((prev) => prev ? ({...prev, topic: e.target.value}) : prev)}
        onBlur={(e) => {
          if (e.target.value.trim() === "") {
          // setTopicInput("Add Course Topic...")
          }
        }}
        />
      <div className="flex gap-6 text-lg font-medium border-b">
        <span onClick={()=> setActiveTab("notes")} className={activeTab == "notes" ? "border-b-2 border-blue-700": "cursor-pointer"}>Notes</span>
        <span onClick={()=> setActiveTab("slides")} className={activeTab == "slides" ? "border-b-2 border-blue-700": "cursor-pointer"}>Slides</span>
        <span onClick={()=> setActiveTab("video")} className={activeTab == "video" ? "border-b-2 border-blue-700": "cursor-pointer"}>Video</span>
      </div>
      <div className="flex h-[30vh] w-full flex-col">
        {
            activeTab == "notes" ? <QuillEditor value={week.notes} onChange={handleEditorChange} /> :  activeTab == "slides" ? "This ought to be the the slides parts" : (
                <div>
                    <div className="bg-slate-300 h-40 text-white flex justify-center items-center">
                        <span >
                            <FaUpload/>
                            Upload a Video
                        </span>    
                    </div>
                </div>
            ) 
        }
        
      </div>
    </section>
    )
}