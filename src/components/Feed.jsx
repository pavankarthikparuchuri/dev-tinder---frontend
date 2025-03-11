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
    feedData?.length && (
      <div className="flex justify-center my-10">
        <UserCard userData={feedData[0]} />
      </div>
    )
  );
};

export default Feed;
