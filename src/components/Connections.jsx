import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnectionsInfo } from "../utils/connectionsSlice";
const Connections = () => {
  const dispatch = useDispatch();
  const userConnections = useSelector((state) => state.connectionsSlice);
  const getConnections = async () => {
    try {
      const data = await axios.get("http://localhost:7777/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnectionsInfo(data?.data?.data || []));
    } catch (err) {
      console.log("ERROR: ", err);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);
  if (!userConnections.length)
    return (
      <h2 className="text-center font-bold text-4xl my-10">
        No Connections Found!
      </h2>
    );
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-4xl">Connections</h1>
      <div className="flex flex-col items-center">
        {userConnections.map((item, index) => {
          const { firstName, lastName, photoUrl, age, gender, about } = item;
          return (
            <div
              className="m-4 p-4 rounded-lg bg-base-300 flex w-1/2"
              key={index}
            >
              <div>
                <img
                  alt="photo"
                  className="w-20 h-20 min-h-20 min-w-20 object-cover rounded-full"
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
