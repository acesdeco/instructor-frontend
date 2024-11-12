//import { Link } from "@remix-run/react";
import {
  // LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import {
  json,
  // useLoaderData,
  // useOutletContext
} from "@remix-run/react";
export const meta: MetaFunction = () => {
  return [
    { title: "Courses" },
    { name: "description", content: "View Courses" },
  ];
};

export default function Dashboard() {
  // const user = useOutletContext();
  // const { courses } = useLoaderData<typeof loader>();
  return (
    <>
      <header className="mb-10 flex flex-row items-center justify-between">
        <h1 className="text-black text-2xl font-semibold">Courses</h1>
        <button className="bg-[#001633] px-4 py-2 rounded-md">
          Create Course
        </button>
      </header>
      <main>
        <section className="flex flex-row justify-between items-center rounded-md bg-[#E3EFFC] py-6 border-[#1671D9] border px-6">
          <article className="w-4/6">
            <p className="text-[#001633]">
              Your efforts truly matter. With every step, you uplift lives and
              bring more light to the world. Thank you for being amazing.
            </p>
            <button className="bg-[#001633] px-4 py-2 rounded-md mt-2">
              Create Course
            </button>
          </article>
          <figure className="w-2/6 flex flex-row justify-center">
            <img alt="Badge" src="/badge-of-honour.png"></img>
          </figure>
        </section>
        <section className="flex flex-col justify-between mt-5">
          <header>
            <h2 className="text-black text-2xl font-semibold">
              Your schedule
            </h2>
          </header>
          <figure className="w-full flex flex-row justify-center">
            <img alt="Schedule" src="/schedule.png"></img>
          </figure>
        </section>
      </main>
    </>
  );
}

export async function loader() {
// {
//   request,
// }: LoaderFunctionArgs
  
  return json({});
}
