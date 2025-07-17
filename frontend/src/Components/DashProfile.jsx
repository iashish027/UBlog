import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <h1>Profile</h1>
      <form>
        <img
          src={currentUser.imageUrl ? currentUser.imageUrl : ""}
          alt="user"
        />
      </form>
    </div>
  );
}
