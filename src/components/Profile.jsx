import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const userInfo = useSelector((state) => state.userSlice);
  return (
    userInfo && (
      <div className="flex justify-center my-10">
        <EditProfile userInfo={userInfo} />
      </div>
    )
  );
};
export default Profile;
