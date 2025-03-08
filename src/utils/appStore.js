import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const AppStore = configureStore({
  reducer: { userSlice },
});

export default AppStore;
