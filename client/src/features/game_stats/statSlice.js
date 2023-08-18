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
  export const deleteGameStat = createAsyncThunk("stats/deleteGameStat", async (statId) => {
    try {
      const response = await fetch(`/game_stats/${statId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete game stat");
      }
  
      return statId; // Return the ID of the deleted stat
    } catch (error) {
      throw error;
    }
  });

const statSlice = createSlice({
  name: "stats",
  initialState: {
    entities: [], // Existing game_stat data
    status: "idle",
  },
  reducers: {
    statAdded(state, action) {
      state.entities.push(action.payload);
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
    [addGameStat.fulfilled](state, action) {
      state.entities.push(action.payload); // Update the state with the newly added stat
    },
    [deleteGameStat.fulfilled](state, action) {
      const statId = action.payload;
      const index = state.entities.findIndex((stat) => stat.id === statId);
      if (index !== -1) {
        state.entities.splice(index, 1);
      }}
  },
});

export const { statAdded, statRemoved } = statSlice.actions;

export default statSlice.reducer;


