import { v4 as uuid } from "uuid";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTeams = createAsyncThunk("teams/fetchTeams", () => {
    // return a Promise containing the data we want
    return fetch("/teams")
      .then((response) => response.json())
      .then((data) => data);
  });

  export const addTeam = createAsyncThunk(
    'team/addTeam',
    async (newTeam, { rejectWithValue }) => {
      try {
        const response = await fetch('/teams', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTeam),
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
const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    entities: [],
    status: "idle",
    error: null,
  },
  reducers: {
    teamAdded(state, action) {
      state.entities.push(action.payload);
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
    }, [addTeam.fulfilled](state, action) {
      state.entities.push(action.payload); // Update the state with the newly added stat
      state.error = null;
    },
    [addTeam.rejected](state, action){
      state.status= "idle";
      state.error = action.payload;
    },
  },
});

export const { teamAdded, teamRemoved } = teamsSlice.actions;

export default teamsSlice.reducer;
