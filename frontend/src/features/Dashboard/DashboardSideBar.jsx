import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";
import signOut from "../auth/signOut";
import { useDispatch } from "react-redux";
export default function DashSideBar() {
  const dispatch = useDispatch();
  return (
    <div className="h-fit md:h-screen border-r shadow-md">
      <div className="p-4 font-bold text-xl border-b">Dashboard</div>
      <nav className="flex flex-col p-4 space-y-2">
        <Link
          to="/dashboard?tab=profile"
          className="flex items-center gap-2 p-2 text-gray-700 rounded hover:bg-gray-100"
        >
          <HiUser className="w-5 h-5" />
          <span>Profile</span>
        </Link>
        <Link
          to="/dashboard?tab=posts"
          className="flex items-center gap-2 p-2 text-gray-700 rounded hover:bg-gray-100"
        >
          <HiUser className="w-5 h-5" />
          <span>Posts</span>
        </Link>
        <button
          className="flex items-center gap-2 p-2 text-red-600 rounded hover:bg-red-50"
          onClick={() => dispatch(signOut())}
        >
          <HiArrowSmRight className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </nav>
    </div>
  );
}
