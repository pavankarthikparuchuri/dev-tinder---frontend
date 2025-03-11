import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequestsInfo, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requestRecievedInfo = useSelector((state) => state.requestsSlice);
  const getRequestsData = async () => {
    try {
      const data = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequestsInfo(data?.data?.data));
    } catch (err) {
      console.log("Error: " + err.message);
    }
  };
  const requestsActions = async (status, id) => {
    try {
      const data = await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(data);
      dispatch(removeRequest(id));
      getRequestsData();
    } catch (err) {
      console.log("Error: " + err.message);
    }
  };
  useEffect(() => {
    getRequestsData();
  }, []);
  if (!requestRecievedInfo.length)
    return (
      <h2 className="text-center font-bold text-4xl my-10">
        No Connection Requests Found!
      </h2>
    );
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-4xl">Connection Requests</h1>
      <div className="flex flex-col items-center">
        {requestRecievedInfo.map(({ _id, fromUserId }) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            fromUserId;
          return (
            <div
              className="m-4 p-4 w-2/3 rounded-lg bg-base-300 flex items-center justify-between"
              key={_id}
            >
              <div>
                <img
                  alt="photo"
                  className="w-20 h-20  min-h-20 min-w-20  object-cover rounded-full"
                  src={photoUrl}
                />
              </div>
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + "," + gender}</p>}

                <p>{about}</p>
              </div>
              <div>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => requestsActions("rejected", _id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => requestsActions("accepted", _id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
