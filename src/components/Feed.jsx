import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeedInfo } from "../utils/feedSlice";
import UserCard from "./UserCard";
const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feedSlice);
  const getFeed = async () => {
    try {
      const data = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeedInfo(data?.data?.data || []));
    } catch (err) {
      console.log("error: ", err.message);
    }
  };
  useEffect(() => {
    if (!feedData) getFeed();
  }, []);
  return (
    <div className="flex justify-center my-10">
      <UserCard
        userData={{
          _id: "67c2ee2e729f071c85abadc3",
          firstName: "Elon",
          lastName: "Musk",
          photoUrl: "https://geographyandyou.com/images/user-profile.png",
          about: "This is a default value of a user",
          skills: [],
        }}
      />
    </div>
  );
};

export default Feed;
