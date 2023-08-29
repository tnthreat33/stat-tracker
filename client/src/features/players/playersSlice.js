import { v4 as uuid } from "uuid";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

  export const addPlayer = createAsyncThunk(
    'player/addPlayer',
    async (newPlayer, { rejectWithValue }) => {
      try {
        const response = await fetch('/players', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPlayer),
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
const playersSlice = createSlice({
  name: "players",
  initialState: {
    entities: [],
    status: "idle",
    error: null,
  },
  reducers: {
    playerAdded(state, action) {
      state.entities.push(action.payload);
    },
    playerRemoved(state, action) {
      const index = state.entities.findIndex((r) => r.id === action.payload);
      state.entities.splice(index, 1);
    },
  },
  extraReducers: {
    // handle async actions: pending, fulfilled, rejected (for errors)
    [addPlayer.fulfilled](state, action) {
      state.entities.push(action.payload); // Update the state with the newly added stat
      state.error = null;
    },
    [addPlayer.rejected](state, action){
      state.status= "idle";
      state.error = action.payload;
    },
  },
});

export const { playerAdded, playerRemoved } = playersSlice.actions;

export default playersSlice.reducer;
