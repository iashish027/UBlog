import { Link } from "react-router";
import { Avatar } from "flowbite-react";
import { useSelector } from "react-redux";
function HeaderAvatar() {
  const currentUser = useSelector((state) => state.user.currentUser);
  // Get first letter of name or email
  const userInitial = currentUser
    ? (currentUser.username || currentUser.email || "U")[0].toUpperCase()
    : null;
  return (
    <>
      {currentUser ? (
        <Link to="/dashboard">
          <Avatar
            rounded
            placeholderInitials={userInitial}
            className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold flex items-center justify-center"
          />
        </Link>
      ) : (
        <Link to="/signin">
          <Button
            className="bg-gradient-to-r from-purple-500 to-blue-500"
            outline
          >
            Sign in
          </Button>
        </Link>
      )}
    </>
  );
}

export default HeaderAvatar;
