import { v4 as uuid } from "uuid";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTeams = createAsyncThunk("teams/fetchTeams", () => {
    // return a Promise containing the data we want
    return fetch("/teams")
      .then((response) => response.json())
      .then((data) => console.log(data));
  });

const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    entities: [],
    status: "idle",
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
  extraReducers: {
    // handle async actions: pending, fulfilled, rejected (for errors)
    [fetchTeams.pending](state) {
      state.status = "loading";
    },
    [fetchTeams.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
  },
});

export const { teamAdded, teamRemoved } = teamsSlice.actions;

export default teamsSlice.reducer;
