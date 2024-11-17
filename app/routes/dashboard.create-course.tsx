import {
  ActionFunctionArgs,
  json,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { createCourse, ICourse } from "~/axios/Courses";
import { IUser } from "~/axios/User";
import Modal from "~/components/Modal";
import { user as userState } from "~/serverstate.server";


type ActionData = {
  validationErrors?: { [key: string]: string };
  data?: IUser;
  responseError?: {
    success: boolean;
    message: string;
    details?: {
      code: number;
      message: string;
      details?: string;
    };
  };
};
export async function loader() {
  // {
  //   request,
  // }: LoaderFunctionArgs

  return json({});
}

export const meta: MetaFunction = () => {
  return [
    { title: "Create Course" },
    { name: "description", content: "Creating course..." },
  ];
};

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
      id: cookie.user.user || cookie.user._id,
      name:
        cookie.user.fullName ||
        cookie.user.firstName + " " + cookie.user.lastName,
    },
  };
  const response = await createCourse(courseData);
  console.log(response);
  if (response.success && "data" in response) {
    return redirect(`/course/${(response?.data as ICourse)?.slug}/edit`);
  }
  if (!response.success) {
    return json({ responseError: { ...response } });
  }
  return response;
}

export default function CreateCourse() {
  const actionData = useActionData<ActionData>();
  const [modalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (actionData?.responseError) {
      setIsSubmitting(false);
      setModalOpen(true);
    }
    if(actionData?.validationErrors) {
      setIsSubmitting(false);
    }
  }, [actionData]);
  return (
    <>
    {actionData?.responseError && modalOpen && (
      <div className="fixed h-screen z-50 w-screen inset-0 flex items-center justify-center bg-opacity-50 bg-black">
        <div className="bg-white w-1/2 absolute p-6 rounded shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-600">
            Error
          </h2>
          <p className="text-sm text-gray-600">
          {actionData.responseError.details?.message || actionData.responseError.message }
          </p>
          <button
            onClick={() => setModalOpen(false)}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    )}
    <Form key={"create"} id="create-form" method="post">
      <Modal
        isModalOpen={true}
        header="Create Course"
        isForm={true}
        acceptText="Create Course"
      >
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
      </Modal>
    </Form>
    </>
  );
}
