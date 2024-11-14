import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useLoaderData, useSearchParams} from "@remix-run/react";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowDown,} from "react-icons/io";
import { AssessmentComponent } from "~/components/Assessments/AssessmentComponent";
// import AssessmentComponent from "~/components/Assessments/LargeAssessmentComponent";
import { HeaderComp } from "~/components/Header";
import { user as userState } from "~/serverstate.server";
type LoaderData = {
  user: {
    fullName: string;
    user: string;
  };
};
import { LoaderFunction, redirect, json } from "@remix-run/node";
import { user as userState } from "~/serverstate.server";
import {  addWeek, getCourseBySlug, getWeeksByCoursesId, ICourse, updateCourse, updateWeek } from "~/axios/Courses";
import CourseInput from "~/components/Courses/CourseEditing";

export const loader: LoaderFunction = async ({ request,params }) => {
  const cookieHeader = request.headers.get("Cookie");
  let { searchParams } = new URL(request.url);
  const slug = params.courseslug
  const cookie = (await userState.parse(cookieHeader)) || {};

  const course:ICourse = await getCourseBySlug(slug as string)
  
  if(!course) {
    return json({course: null, weeks:null, message: "Course not found"})
}
const weeks = (await getWeeksByCoursesId(course._id as string)).data
if(!weeks){
  return json({course:course})
}  

console.log(weeks, course)
return json({ course , weeks})

};

export default function CourseEdit() {
  const [activeTab, setActiveTab] = useState("materials");
  const {course, weeks} : {course: ICourse; weeks: (typeof course.weeks[0])[] } = useLoaderData<typeof loader>()
  const [week, setWeek] = useState<typeof course.weeks[0] |  null>()
  const [searchParams] = useSearchParams();
  const weekParams = searchParams.get("week");

  console.log(weekParams)
  useEffect(()=> {    
    console.log(weekParams)
    if(weekParams){
      setWeek(weeks[parseInt(weekParams)-1])   
    }else{
    console.log(course.weeks["1"])
    setWeek(weeks[0])  
    }
  },[weekParams])

  const handleUpdateWeek = async () => {
    console.log(course.title)
    if (week) {
      const data:ICourse["weeks"][0] = (await updateWeek( week._id , week)).data
      if(data) {
        redirect(`/course/${course.slug}/edit?week=${week.weekNumber}`)
      }
    }
  }

  const handleCreateNewWeek = async() => {
    const data =  await addWeek(course._id as string, {
      weekNumber: weeks.length + 1,
      topic: "Untitled", 
      notes: "This",
      video: "hello.mp3"
    }) 
    if(data){
      redirect(`/course/${course.slug}/edit?week=${data.weeksNumber}`)
    }

    console.log(data)
  }

  const [value, setValue] = useState("")
  return (
    <div className=" w-[100vw] h-[100vh] fixed overflow-y-auto">
      <HeaderComp/>
      <section className="bg-blue-200 text-black w-full h-[90%] fixed pb-0">
        <div className="bg-[#0080ff] flex items-center text-white px-10 py-4">
          <span className="cursor-pointer">
            <IoIosArrowBack size={30} />
          </span>
          <p className="text-xl font-semibold">
            Course / {course.title}
          </p>
        </div>
        <div className="h-[90%] flex ">
          <div className="left flex h-full flex-col gap-4 pl-8 pr-5 py-4 bg-[#F3F4F5] w-1/4">
            <h3 className="text-xl font-semibold">Course Upload</h3>
            {
              !course ? (
                <div>Failed to get course Data</div>
              ): (
                  <div className="flex gap-4 flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Content</h3>
                <div className="flex items-center gap-4">
                  <span className="cursor-pointer" onClick={handleCreateNewWeek}>
                    <BiPlus size={22} />
                  </span>
                  <span>
                    <IoIosArrowDown size={22} />
                  </span>
                </div>
              </div>
              <div className="weeks flex flex-col gap-3">
                {
                 weeks.map((aWeek,index) => (
                  <Link to={`?week=${index + 1}`} key={aWeek._id} className={`aweek cursor-pointer hover:bg-slate-400 flex text-sm items-center gap-2 p-2 rounded-md ${
                  parseInt(weekParams as string)== index + 1 ? "bg-slate-200 " : ""
                  }`}>
                  <span className="w-8 flex justify-center items-center h-8 bg-[#A9D4FF] rounded-full">
                    0{index + 1}
                  </span>
                  <p className="font-medium ">
                  {aWeek.topic}
                  </p>
                </Link>
                  ))
                }
            
              </div>
            </div>
              )
            }
          
          </div>
          <div className="right px-6 pt-6 gap-5 w-full h-full bg-white pb-10 overflow-auto  flex flex-col text-black">
            <div className="flex text-lg font-medium gap-3">
              <button
                className={`cursor-pointer ${
                  activeTab === "materials" ? "text-[#0080FF]" : ""
                }`}
                onClick={() => setActiveTab("materials")}
              >
                Materials
              </button>
              <button
                className={`cursor-pointer ${
                  activeTab === "assessment" ? "text-[#0080FF]" : ""
                }`}
                onClick={() => setActiveTab("assessment")}
              >
                Assessment
              </button>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {activeTab === "materials" ? (
                <>
                {week && <CourseInput submit={handleUpdateWeek} week={week} setWeek={setWeek}/>}
                </>
              ) : (
                <AssessmentComponent user={{name: user.fullName, id: user.user}} courseId="6735c48c09cec90061065561" weekId="673612d59b484d00734caa2b"/>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userState.parse(cookieHeader)) || {};
  console.log(cookie);
  return json({ user: cookie.user });
}
