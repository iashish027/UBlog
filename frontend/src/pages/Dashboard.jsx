import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import DashSideBar from "../Components/DashSideBar";
import DashProfile from "../Components/DashProfile";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl);
    console.log(tabFromUrl);
  }, [location.search]);
  return (
    <div className="md:min-h-screen flex md:flex-row  flex-col">
      <div className="w-full md:w-56 border-2 ">
        {/* sidebar */}
        <DashSideBar />
      </div>
      <div>
        {/* profile... */}
        {tab == "profile" && <DashProfile />}
      </div>
    </div>
  );
}
