import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feedSlice",
  initialState: null,
  reducers: {
    addFeedInfo: (state, action) => {
      return action.payload;
    },
    removeFeedInfo: () => {
      return null;
    },
  },
});

export const { addFeedInfo, removeFeedInfo } = feedSlice.actions;
export default feedSlice.reducer;
