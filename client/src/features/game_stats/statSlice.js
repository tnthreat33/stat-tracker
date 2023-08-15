import { v4 as uuid } from "uuid";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStats = createAsyncThunk("stats/fetchStats", () => {
    // return a Promise containing the data we want
    return fetch("/game_stats")
      .then((response) => response.json())
      .then((data) => data);
  });
  export const addGameStat = createAsyncThunk("stats/addGameStat", async (newStat) => {
    try {
      const response = await fetch("/game_stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStat),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add game stat");
      }
  
      const data = await response.json();
      return data; // You might want to return the newly added stat data
    } catch (error) {
      throw error;
    }
  });

const statSlice = createSlice({
  name: "stats",
  initialState: {
    entities: [],
    status: "idle",
  },
  reducers: {
    statAdded(state, action) {
      state.entities.push({ id: uuid(), name: action.payload });
    },
    statRemoved(state, action) {
      const index = state.entities.findIndex((r) => r.id === action.payload);
      state.entities.splice(index, 1);
    },
  },
  extraReducers: {
    // handle async actions: pending, fulfilled, rejected (for errors)
    [fetchStats.pending](state) {
      state.status = "loading";
    },
    [fetchStats.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
  },
});

export const { statAdded, statRemoved } = statSlice.actions;

export default statSlice.reducer;