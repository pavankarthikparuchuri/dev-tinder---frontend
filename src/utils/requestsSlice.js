import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requestsSlice",
  initialState: [],
  reducers: {
    addRequestsInfo: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      return state.filter(({ _id }) => _id !== action.payload);
    },
  },
});

export const { addRequestsInfo, removeRequest } = requestsSlice.actions;
export default requestsSlice.reducer;
