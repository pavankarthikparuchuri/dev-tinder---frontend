import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: null,
  reducers: {
    addUserInfo: (state, action) => {
      return action.payload;
    },
    removeUserInfo: () => {
      return null;
    },
  },
});

export const { addUserInfo } = userSlice.actions;
export default userSlice.reducer;
