import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import AppStore from "./utils/appStore";
import Body from "./components/Body";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
function App() {
  return (
    <div>
      <Provider store={AppStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/premium" element={<Premium />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
