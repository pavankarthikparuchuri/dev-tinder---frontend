import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feedSlice",
  initialState: [],
  reducers: {
    addFeedInfo: (state, action) => {
      return action.payload;
    },
    removeFeedInfo: (state, action) => {
      return state.filter((item) => item._id != action.payload);
    },
  },
});

export const { addFeedInfo, removeFeedInfo } = feedSlice.actions;
export default feedSlice.reducer;
