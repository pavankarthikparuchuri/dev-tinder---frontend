import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = () => {
  const data = useSelector((state) => state.userSlice);
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to={"/"}>
          👨‍💻DevTinder
        </Link>
      </div>
      <div className="flex gap-2">
        {data && (
          <div className="flex items-center gap-2">
            <p className="text-primary font-bold font-3xl">
              Welcome, {data.firstName}!
            </p>
            <div className="dropdown dropdown-end mr-4">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User Photo" src={data.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link className="justify-between" to={"/profile"}>
                    Profile
                    {/* <span className="badge">New</span> */}
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
