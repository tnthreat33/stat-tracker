import { v4 as uuid } from "uuid";
import { createSlice } from "@reduxjs/toolkit";

const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    entities: [],
  },
  reducers: {
    teamAdded(state, action) {
      state.entities.push({ id: uuid(), name: action.payload });
    },
    teamRemoved(state, action) {
      const index = state.entities.findIndex((r) => r.id === action.payload);
      state.entities.splice(index, 1);
    },
  },
});

export const { teamAdded, teamRemoved } = teamsSlice.actions;

export default teamsSlice.reducer;