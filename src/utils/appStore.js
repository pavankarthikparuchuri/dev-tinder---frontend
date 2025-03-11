import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import connectionsSlice from "./connectionsSlice";

const AppStore = configureStore({
  reducer: { userSlice, feedSlice, connectionsSlice },
});

export default AppStore;
