import {
  Link,
  useLoaderData,
  useNavigate,
  // useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import {
  LoaderFunction,
  // redirect,
  json,
  MetaFunction,
} from "@remix-run/node";
import {
  addWeek,
  getCourseBySlug,
  getWeeksByCoursesId,
  ICourse,
  updateCourse,
  // updateCourse,
  updateWeek,
} from "~/axios/Courses";
import CourseInput from "~/components/Courses/CourseEditing";
import { IUser } from "~/axios/User";
import Overloader from "~/components/overloader";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { AssessmentComponent } from "~/components/Assessments/AssessmentComponent";
// import AssessmentComponent from "~/components/Assessments/LargeAssessmentComponent";
import { HeaderComp } from "~/components/Header";
import { user as userState } from "~/serverstate.server";
import Toggle from "~/components/ToggleComponent";
import { SubmissionsFlow } from "../components/Submissions/SetupSubmissions";
// type LoaderData = {
//   user: {
//     fullName: string;
//     user: string;
//     _id: string;
//     lastName: string;
//     firstName: string;
//   };
// };

export const meta: MetaFunction = () => {
  return [
    { title: "Edit Course" },
    { name: "description", content: "Editing course..." },
  ];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userState.parse(cookieHeader)) || {};
  const slug = params.courseslug;

  const course: ICourse = await getCourseBySlug(slug as string);

  if (!course) {
    return json({
      course: null,
      user: cookie.user,
      weeks: null,
      message: "Course not found",
    });
  }
  const weeks = (await getWeeksByCoursesId(course._id as string)).data;
  if (!weeks) {
    return json({ course: course, user: cookie.user });
  }

  return json({ course, weeks, user: cookie.user });
};

export default function CourseEdit() {
  const [activeTab, setActiveTab] = useState("materials");
  const {
    course,
    weeks,
    user,
  }: { course: ICourse; weeks: (typeof course.weeks)[0][]; user: IUser } =
    useLoaderData<typeof loader>();
  const [week, setWeek] = useState<(typeof course.weeks)[0] | null | undefined>(
    undefined
  );
  const [isWeeksOpen, setIsWeeksOpen] = useState(true);
  const [searchParams] = useSearchParams();
  const weekParams = searchParams.get("week");
  const navigate = useNavigate();
  useEffect(() => {
    if (weekParams) {
      setWeek(weeks[parseInt(weekParams) - 1]);
    } else {
      setWeek(weeks[0]);
    }
  }, [weekParams, weeks, week]);

  const [isLoading, setIsLoading] = useState(false);

  const handlepublishtoggle = async () => {
    setIsLoading(true);
    try {
      console.log(course.title);

      const data = (
        await updateCourse(course._id as string, {
          published: !course.published,
        })
      ).data;
      if (data) {
        navigate(`/course/${course.slug}/edit?week=${week?.weekNumber}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateWeek = async (weekArg: ICourse["weeks"][0]) => {
    setIsLoading(true);
    try {
      console.log(course.title);
      if (week) {
        const data: ICourse["weeks"][0] = (
          await updateWeek(weekArg._id, weekArg)
        ).data;
        if (data) {
          navigate(`/course/${course.slug}/edit?week=${weekArg.weekNumber}`);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNewWeek = async () => {
    setIsLoading(true);
    try {
      const data = await addWeek(course._id as string, {
        weekNumber: weeks.length + 1,
        topic: "Untitled",
        notes: "",
        video: "",
      });
      if (data) {
        navigate(`/course/${course.slug}/edit?week=${data.weekNumber}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" w-[100vw] h-[100vh] fixed overflow-y-auto">
      <HeaderComp />
      <Overloader isLoading={isLoading} />
      <section className="bg-blue-200 text-black w-full h-[90%] fixed pb-0">
        <div className="bg-[#0000ff] justify-between flex items-center text-white px-10 py-4">
          <div className="flex items-center">
            <span className="cursor-pointer">
              <IoIosArrowBack size={30} />
            </span>
            <p className="text-xl font-semibold">
              {" "}
              <Link to={"/dashboard/courses"}> Course</Link> / {course.title}
            </p>
          </div>
          <label className="flex items-center gap-3">
            <span>{course.published ? "Published" : "Publish"}</span>
            <Toggle
              toggle={handlepublishtoggle}
              isToggled={course?.published}
            />
          </label>
        </div>
        <div className="h-[90%] flex ">
          <div className="left flex h-full flex-col gap-4 pl-8 pr-5 py-4 bg-[#F3F4F5] w-1/4">
            <h3 className="text-xl font-semibold">Course Upload</h3>
            {!course ? (
              <div>Failed to get course Data</div>
            ) : (
              <div className="flex gap-4 h-full flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Content</h3>
                  <div className="flex items-center gap-4">
                    <button
                      className="cursor-pointer"
                      onClick={handleCreateNewWeek}
                    >
                      <BiPlus size={22} />
                    </button>
                    <button
                      className="cursor-pointer"
                      onClick={() => setIsWeeksOpen(!isWeeksOpen)}
                    >
                      <IoIosArrowDown size={22} />
                    </button>
                  </div>
                </div>
                <div
                  className={`weeks flex flex-col duration-300 gap-3 ${
                    isWeeksOpen ? "h-full" : "h-0 overflow-hidden"
                  }`}
                >
                  {weeks.length < 1 ? (
                    <div className="h-full justify-center flex-col items-center w-full flex">
                      <p className="text-sm">No Weeks added yet</p>
                      <p className="flex items-center font-medium">
                        Press <BiPlus size={25} /> to add week
                      </p>
                    </div>
                  ) : (
                    weeks.map((aWeek, index) => (
                      <Link
                        to={`?week=${index + 1}`}
                        key={aWeek._id}
                        className={`aweek cursor-pointer hover:bg-slate-400 flex text-sm items-center gap-2 p-2 rounded-md ${
                          parseInt(weekParams as string) == index + 1
                            ? "bg-slate-200 "
                            : ""
                        }`}
                      >
                        <span className="w-8 flex justify-center items-center h-8 bg-[#A9D4FF] rounded-full">
                          0{index + 1}
                        </span>
                        <p className="font-medium ">{aWeek.topic}</p>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="right px-6 pt-6 gap-5 w-full h-full bg-white pb-10 overflow-auto  flex flex-col text-black">
            <div className="flex text-lg font-medium gap-3 border-b">
              <button
                className={`cursor-pointer ${
                  activeTab === "materials"
                    ? "text-[#0080FF] border-b-4 px-4 border-[#0080FF]"
                    : "px-4  border-b-4 border-transparent"
                }`}
                onClick={() => setActiveTab("materials")}
              >
                Materials
              </button>
              <button
                className={`cursor-pointer ${
                  activeTab === "assessment"
                    ? "text-[#0080FF] border-b-4 px-4 border-[#0080FF]"
                    : "px-4  border-b-4 border-transparent"
                }`}
                onClick={() => setActiveTab("assessment")}
              >
                Assessment
              </button>
              <button
                className={`cursor-pointer ${
                  activeTab === "submissions"
                    ? "text-[#0080FF] border-b-4 px-4 border-[#0080FF]"
                    : "px-4 border-b-4 border-transparent"
                }`}
                onClick={() => setActiveTab("submissions")}
              >
                Submissions
              </button>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {activeTab === "materials" && (
                <>
                  {week && (
                    <CourseInput
                      submit={handleUpdateWeek}
                      week={week}
                      setWeek={setWeek}
                    />
                  )}
                </>
              )}
              {activeTab === "assessment" && (
                <AssessmentComponent
                  user={{
                    name: user.fullName as string,
                    id: user.user || user._id,
                  }}
                  courseId={course._id as string}
                  weekId={week!._id as string}
                />
              )}
              {activeTab === "submissions" && (
                <div>
                  <SubmissionsFlow
                    user={{
                      name: user.fullName as string,
                      id: user.user || user._id,
                    }}
                    courseId={course._id as string}
                    weekId={week!._id as string}
                  ></SubmissionsFlow>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
