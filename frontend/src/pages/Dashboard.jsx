import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import DashSideBar from "../Components/DashSideBar";
import DashProfile from "../Components/DashProfile";
import UserPosts from "../Components/UserPosts";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);
  return (
    <div className="md:min-h-screen flex md:flex-row  flex-col">
      <div className="w-full md:w-[20rem] border-2 flex-none">
        {/* sidebar */}
        <DashSideBar />
      </div>
      <div className="flex-1">
        {/* profile... */}
        {tab == "profile" && <DashProfile />}
        {tab == "posts" && <UserPosts />}
      </div>
    </div>
  );
}
