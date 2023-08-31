import { v4 as uuid } from "uuid";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

  export const addGame = createAsyncThunk(
    'game/addGame',
    async (newGame, { rejectWithValue }) => {
      try {
        const response = await fetch('/games', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newGame),
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
const gamesSlice = createSlice({
  name: "games",
  initialState: {
    entities: [],
    status: "idle",
    error: null,
  },
  reducers: {
    gameAdded(state, action) {
      state.entities.push(action.payload);
    },
    gameRemoved(state, action) {
      const index = state.entities.findIndex((r) => r.id === action.payload);
      state.entities.splice(index, 1);
    },
  },
  extraReducers: {
    // handle async actions: pending, fulfilled, rejected (for errors)
    [addGame.fulfilled](state, action) {
      state.entities.push(action.payload); // Update the state with the newly added stat
      state.error = null;
       
    },
    [addGame.rejected](state, action){
      state.status= "idle";
      state.error = action.payload;
    },
  },
});

export const { gameAdded, gameRemoved } = gamesSlice.actions;

export default gamesSlice.reducer;
