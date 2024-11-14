import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowDown,} from "react-icons/io";
import { AssessmentComponent } from "~/components/Assessments/AssessmentComponent";
// import AssessmentComponent from "~/components/Assessments/LargeAssessmentComponent";
import Editor from "~/components/editor";
import { HeaderComp } from "~/components/Header";
import { user as userState } from "~/serverstate.server";
type LoaderData = {
  user: {
    fullName: string;
    user: string;
  };
};

export default function CourseEdit() {
  const [activeTab, setActiveTab] = useState("materials");
  const [value, setValue] = useState("");
  const { user } = useLoaderData<LoaderData>();
  return (
    <div className=" w-[100vw] h-[100vh] fixed overflow-y-auto">
      <HeaderComp/>
      <section className="bg-blue-200 text-black w-full h-[90%] fixed pb-0">
        <div className="bg-[#0080ff] flex items-center text-white px-10 py-4">
          <span className="cursor-pointer">
            <IoIosArrowBack size={30} />
          </span>
          <p className="text-xl font-semibold">
            Course / Introduction to Python Coding
          </p>
        </div>
        <div className="h-[90%] flex ">
          <div className="left flex h-full flex-col gap-4 pl-8 pr-5 py-4 bg-[#F3F4F5] w-1/4">
            <h3 className="text-xl font-semibold">Course Upload</h3>
            <div className="flex gap-4 flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Content</h3>
                <div className="flex items-center gap-4">
                  <span>
                    <BiPlus size={22} />
                  </span>
                  <span>
                    <IoIosArrowDown size={22} />
                  </span>
                </div>
              </div>
              <div className="weeks">
                <div className="aweek flex text-sm items-center gap-2 bg-slate-200 p-2 rounded-md">
                  <span className="w-11 flex justify-center items-center h-8 bg-[#A9D4FF] rounded-full">
                    01
                  </span>
                  <p className="font-medium ">
                    Python Essentials: Introduction to Data Science
                  </p>
                </div>
              </div>
            </div>
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
            <div className="mt-4">
              {activeTab === "materials" ? (
                <section>
                  <h1 className="text-2xl font-semibold">
                    Python Essentials: Introduction to Data Science
                  </h1>
                  <div className="flex gap-6 text-lg font-medium border-b">
                    <span>Notes</span>
                    <span>Slides</span>
                    <span>Video</span>
                  </div>
                  <div>
                    <Editor value={value} onChange={() => setValue} />
                  </div>
                </section>
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
