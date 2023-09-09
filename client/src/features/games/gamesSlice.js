
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGames = createAsyncThunk("games/fetchGames", () => {
  // return a Promise containing the data we want
  return fetch("/games")
    .then((response) => response.json())
    .then((data) => data);
});

  export const addGame = createAsyncThunk(
    'game/addGame',
    async (newGame, { dispatch, rejectWithValue }) => {
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

        dispatch(gameAdded(data));
        
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
    [fetchGames.pending](state) {
      state.status = "loading";
    },
    [fetchGames.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    }, 
  },
});

export const { gameAdded, gameRemoved } = gamesSlice.actions;

export default gamesSlice.reducer;
