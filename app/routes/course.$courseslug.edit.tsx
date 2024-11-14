import { Link } from "@remix-run/react";
import { useState } from "react";
import { BiMenuAltRight, BiPlus } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowDown, IoIosClose } from "react-icons/io";
import { IoNotificationsOutline, IoPersonCircleOutline } from "react-icons/io5";
import Editor from "~/components/Editor.client";

export default function CourseEdit() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [value, setValue] = useState("")
  return (
    <div className="w-screen h-screen">
      <header className="w-[100%] bg-white h-fit md:h-[15%] flex flex-row items-center py-5 justify-between bg-transparent px-10">
        <div id="left">
          <Link className="w-5" to="/dashboard/course">
            <img alt="Union" src="/Union.png"></img>
          </Link>
        </div>
        <div className="flex flex-row items-center">
          <div className="md:flex hidden flex-row items-center mx-10 border border-gray-200 rounded-lg ">
            <input
              className="text-black bg-transparent focus:outline-none focus:border-gray-500 px-3 p-1 rounded-l-md"
              type="text"
              placeholder="Search for a course"
            />
            <button
              type="submit"
              className="w-full h-full rounded-r-md bg-blue-600 p-1 px-4 border border-blue-600"
            >
              Search
            </button>
          </div>
          <div className="w-6 mx-4">
            <IoNotificationsOutline size={30} color="#1671d9" />
          </div>
          <div className="flex items-center gap-1 flex-row justify-center">
            <div className="w-6 ">
              <IoPersonCircleOutline size={30} color="#1671d9" />
            </div>
            <div className="md:flex hidden gap-3 justify-center items-center">
              <button>
                <IoIosArrowDown size={20} color="#1671d9" />
              </button>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer md:hidden"
            >
              {isMenuOpen ? (
                <IoIosClose size={30} color="#1671d9" />
              ) : (
                <BiMenuAltRight size={30} color="#1671d9" />
              )}
            </button>
          </div>
        </div>
      </header>
      <section className="bg-white text-black w-full h-[85%]">
        <div className="bg-[#0080ff] flex items-center gap-3 text-white px-10 py-4">
          <span className="cursor-pointer">
            <IoIosArrowBack size={30} />
          </span>
          <p className="text-xl font-semibold">
            Course / Introduction to Python Coding
          </p>
        </div>
        <div className="h-4/5 flex">
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
          <div className="right p-6 gap-5 w-full  flex flex-col text-black">
            <div className="flex text-lg font-medium gap-3">
              <p className="text-[#0080FF]">Materials</p>
              <p>Assessment</p>
            </div>
            <h1 className="text-2xl font-semibold">Python Essentials: Introduction to Data Science</h1>
            <div className="flex gap-6 text-lg font-medium border-b">
              <span>Notes</span>
              <span>Slides</span>
              <span>Video</span>
            </div>
            <div >
                {/* <Editor value={value} setValue={()=>setValue} /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
