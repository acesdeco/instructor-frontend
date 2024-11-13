import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createCourse, ICourse } from "~/axios/Courses";
import Modal from "~/components/Modal";
import { user as userState } from "~/serverstate.server";

export async function loader() {
  // {
  //   request,
  // }: LoaderFunctionArgs

  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userState.parse(cookieHeader)) || {};
  const data = await request.formData();
  const formInfo = Object.fromEntries(data);
  const courseName = formInfo.coursename as string;
  const courseCode = formInfo.coursecode as string;
  const coursedesc = formInfo.coursedesc as string;
  const coursePrice = formInfo.courseprice as string;

  const courseData = {
    code: courseCode,
    description: coursedesc,
    title: courseName,
    coursePrice: coursePrice,
    instructor: {
      id: cookie.user.user,
      name: cookie.user.fullName,
    },
  };
  console.log(courseData);
  const response = await createCourse(courseData);
  if (response.success && "data" in response) {
    console.log("him", response);
    return redirect(`/course/${(response?.data as ICourse)?.slug}`);
  }
  if (!response.success) {
    console.log("him", response);
    return json({ responseError: { ...response } });
  }
  return response;
}

export default function CreateCourse() {
  return (
    <Form key={"create"} id="create-form" method="post">
      <Modal
        isModalOpen={true}
        header="Create Course"
        isForm={true}
        acceptText="Create Course"
        content={
          <div className="flex gap-5 flex-col">
            <div className="flex gap-1 flex-col">
              <label className="text-black" htmlFor="Course name">
                Course Name
              </label>
              <input
                id="coursename"
                name="coursename"
                className="bg-white focus:outline-none outline-none border-b-2 border-b-[#D9D9D9] text-black"
                type="text"
              />
            </div>
            <div className="flex gap-1 flex-col">
              <label className="text-black" htmlFor="Course name">
                Course Code
              </label>
              <input
                id="coursecode"
                name="coursecode"
                className="bg-white focus:outline-none outline-none border-b-2 border-b-[#D9D9D9] text-black"
                type="text"
              />
            </div>
            <div className="flex gap-1 flex-col">
              <label className="text-black" htmlFor="Course name">
                Course Price
              </label>
              <input
                id="courseprice"
                name="courseprice"
                className="bg-white focus:outline-none outline-none border-b-2 border-b-[#D9D9D9] text-black"
                type="text"
              />
            </div>
            <div className="flex  h-48 flex-col">
              <label className="text-black" htmlFor="Course name">
                Course Description
              </label>
              <textarea
                id="coursedesc"
                name="coursedesc"
                className="bg-white h-28 resize-none focus:outline-none outline-none border-b-2 border-b-[#D9D9D9] text-black"
              />
            </div>
          </div>
        }
      />
    </Form>
  );
}
