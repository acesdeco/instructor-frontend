//import { Link } from "@remix-run/react";
import {
  json,
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { NavLinkTs } from "~/components/NavLink";
import { user as userState } from "~/serverstate.server";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import useHeaderActive from "~/hooks/HeaderActive";
import { HeaderComp } from "~/components/Header";
// import { MyDatePicker } from "~/components/DateComponent";
export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard" },
    { name: "description", content: "View Courses" },
  ];
};
const locations = [
  {
    item: "Dashboard",
    location: "/dashboard/home",
  },
  {
    item: "Courses",
    location: "/dashboard/courses",
  },
  {
    item: "Notifications",
    location: "/dashboard/notifications",
  },
];
export default function Dashboard() {
  const [isBottomUp, setIsBottomUp] = useState(false);
  const {menuOpen: isMenuOpen} = useHeaderActive();
  return (
    <main className="w-[100vw] h-[100vh] bg-[#f9f9f9] flex flex-col fixed">
      <HeaderComp/>
      <hr />
      <section className="h-[85%] bg-transparent w-6/6 px-4 md:px-10 gap-2 mt-4 md:mt-10 flex flex-col md:flex-row justify-between items-start relative w-[100%] ">
        <aside
          className={`absolute md:static bg-white px-3 z-10 pt-10 h-full duration-500 w-[300px] ${
            isMenuOpen
              ? "left-0 w-[270px]"
              : "-left-[120%] md:left-0 md:w-[270px] text-wrap"
          }`}
        >
          <ul className="w-[100%]">
            {locations.map((location, y) => (
              <li className="w-full" key={y}>
                <NavLinkTs
                  location={location.location}
                  item={location.item}
                ></NavLinkTs>
              </li>
            ))}
          </ul>
        </aside>

        <main
          className={`relative h-full py-5 duration-150 bg-white flex flex-col w-screen md:w-full overflow-x-clip px-5 overflow-y-auto ${
            isMenuOpen ? "" : "-ml-6 md:ml-0"
          }`}
        >
          <Outlet></Outlet>
        </main>
        <button
          onClick={() => setIsBottomUp(!isBottomUp)}
          className="md:hidden bottom-32 right-10 absolute z-50 p-4 rounded-full bg-blue-500"
        >
          {isBottomUp ? (
            <IoIosArrowDown size={20} color="#ffffff" />
          ) : (
            <IoIosArrowUp size={20} color="#ffffff" />
          )}
        </button>
        {/* <aside
          className={`absolute md:static bg-gray-600 px-3 z-40 pt-10 h-fit duration-500 w-full md:w-1/6  ${
            isBottomUp
              ? "bottom-0 w-[270px]"
              : "-bottom-[100%] md:left-0 w-0 text-wrap"
          }`}
        >
           
          Robust date and event section
          <MyDatePicker></MyDatePicker>
        </aside> */}
      </section>
    </main>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userState.parse(cookieHeader)) || {};
  if(cookie.user){
    return json({ user: cookie.user });
  }else {
    return redirect("/auth/login");
  }
}
