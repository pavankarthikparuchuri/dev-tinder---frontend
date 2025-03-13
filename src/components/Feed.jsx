import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeedInfo } from "../utils/feedSlice";
import UserCard from "./UserCard";
const Feed = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feedSlice);
  const getFeed = async () => {
    try {
      setLoading(true);
      const data = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeedInfo(data?.data?.data || []));
      setLoading(false);
    } catch (err) {
      console.log("error: ", err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!feedData.length) getFeed();
  }, []);
  if (!feedData.length)
    return (
      <h2 className="text-center font-bold text-4xl my-10">Empty Feed!</h2>
    );
  if (loading) {
    return (
      <h2 className="text-center font-bold text-4xl my-10">Fetching Feed!</h2>
    );
  }
  return (
    feedData?.length && (
      <div className="flex justify-center my-10">
        <UserCard userData={feedData[0]} getFeed={getFeed} />
      </div>
    )
  );
};

export default Feed;
