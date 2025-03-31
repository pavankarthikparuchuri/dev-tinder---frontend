import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnectionsInfo } from "../utils/connectionsSlice";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";
const Connections = () => {
  const dispatch = useDispatch();
  const userConnections = useSelector((state) => state.connectionsSlice);
  const getConnections = async () => {
    try {
      const data = await axios.get(`${BASE_URL}/user/connections`, {
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
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            item;
          return (
            <div
              className="m-4 p-4 rounded-lg bg-base-300 flex min-w-[472px] w-1/3 justify-between"
              key={index}
            >
              <div className="flex">
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
              <div className="content-center">
                <Link to={`/chat/${_id}`}>
                  <button className="btn bg-[#5EBB2B] text-white border-[#4eaa0c]">
                    <svg
                      aria-label="WeChat logo"
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                    >
                      <g fill="white">
                        <path d="M11.606,3.068C5.031,3.068,0,7.529,0,12.393s4.344,7.681,4.344,7.681l-.706,2.676c-.093,.353,.284,.644,.602,.464l3.173-1.798c1.403,.447,4.381,.59,4.671,.603-.208-.721-.311-1.432-.311-2.095,0-3.754,3.268-9.04,10.532-9.04,.165,0,.331,.004,.496,.011-.965-4.627-5.769-7.827-11.195-7.827Zm-4.327,7.748c-.797,0-1.442-.646-1.442-1.442s.646-1.442,1.442-1.442,1.442,.646,1.442,1.442-.646,1.442-1.442,1.442Zm8.386,0c-.797,0-1.442-.646-1.442-1.442s.646-1.442,1.442-1.442,1.442,.646,1.442,1.442-.646,1.442-1.442,1.442Z"></path>
                        <path d="M32,19.336c0-4.26-4.998-7.379-9.694-7.379-6.642,0-9.459,4.797-9.459,7.966s2.818,7.966,9.459,7.966c1.469,0,2.762-.211,3.886-.584l2.498,1.585c.197,.125,.447-.052,.394-.279l-.567-2.46c2.36-1.643,3.483-4.234,3.483-6.815Zm-12.73-.81c-.704,0-1.275-.571-1.275-1.275s.571-1.275,1.275-1.275,1.275,.571,1.275,1.275c0,.705-.571,1.275-1.275,1.275Zm6.373,0c-.704,0-1.275-.571-1.275-1.275s.571-1.275,1.275-1.275,1.275,.571,1.275,1.275-.571,1.275-1.275,1.275Z"></path>
                      </g>
                    </svg>
                    Chat
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
