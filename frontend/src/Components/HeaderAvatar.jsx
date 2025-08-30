import { Link } from "react-router";
import { Avatar } from "flowbite-react";
import { useSelector } from "react-redux";
import { useState } from "react";

function HeaderAvatar() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [menuOpen, setMenuOpen] = useState(false);

  // Get first letter of name or email
  const userInitial = currentUser
    ? (currentUser.username || currentUser.email || "U")[0].toUpperCase()
    : null;

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      {currentUser ? (
        <div className="relative inline-block">
          <div
            onClick={toggleMenu}
            className="cursor-pointer w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold flex items-center justify-center rounded-full"
          >
            {userInitial}
          </div>
          {menuOpen && (
            <div className="absolute bg-blend-normal dark:bg-blue-900 bg-white   mt-2 w-48 border rounded shadow-md">
              <ul>
                <li className="px-4 py-2  dark:hover:bg-black hover:bg-gray-100 cursor-pointer">
                  <Link to="/Dashboard">Profile</Link>
                </li>
                <li className="px-4 py-2 dark:hover:bg-black hover:bg-gray-100 cursor-pointer">
                  {/* <button onClick={signOut}>Logout</button> */}
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link to="/signin">
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded">
            Sign in
          </button>
        </Link>
      )}
    </>
  );
}

export default HeaderAvatar;
