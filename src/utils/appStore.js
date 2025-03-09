import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";

const AppStore = configureStore({
  reducer: { userSlice, feedSlice },
});

export default AppStore;
