import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connectionsSlice",
  initialState: [],
  reducers: {
    addConnectionsInfo: (state, action) => action.payload,
    removeConnectionsInfo: () => [],
  },
});

export const { addConnectionsInfo } = connectionsSlice.actions;
export default connectionsSlice.reducer;
