import { v4 as uuid } from "uuid";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStats = createAsyncThunk("stats/fetchStats", () => {
    // return a Promise containing the data we want
    return fetch("/game_stats")
      .then((response) => response.json())
      .then((data) => data);
  });
  export const addGameStat = createAsyncThunk(
    'stats/addGameStat',
    async (newStat, { rejectWithValue }) => {
      try {
        const response = await fetch('/game_stats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newStat),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(errorData); // Reject with the error payload
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message); // Reject with the error message
      }
    }
  );
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

  export const updateGameStat = createAsyncThunk(
    "stats/updateGameStat",
    async ({ id, updatedStat ,rejectWithValue }) => {
      try {
        const response = await fetch(`/game_stats/${id}`, {
          method: "PATCH", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStat),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(errorData); // Reject with the error payload
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message); // Reject with the error message
      }
    }
  );

const statSlice = createSlice({
  name: "stats",
  initialState: {
    entities: [], // Existing game_stat data
    status: "idle",
    error: null,
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
      state.error = null;
    },
    [addGameStat.rejected](state, action){
      state.status= "idle";
      state.error = action.payload;
    },
    [deleteGameStat.fulfilled](state, action) {
      const statId = action.payload;
      const index = state.entities.findIndex((stat) => stat.id === statId);
      if (index !== -1) {
        state.entities.splice(index, 1);
      }},
  
  [updateGameStat.fulfilled](state, action) {
    const updatedStat = action.payload;
    const index = state.entities.findIndex((stat) => stat.id === updatedStat.id);
    if (index !== -1) {
      state.entities[index] = updatedStat; // Update the state with the updated stat
    }
    state.error = null;
  },
  [updateGameStat.rejected](state, action){
    state.status= "idle";
    state.error = action.payload;
  },
  }})


export const { statAdded, statRemoved } = statSlice.actions;

export default statSlice.reducer;


