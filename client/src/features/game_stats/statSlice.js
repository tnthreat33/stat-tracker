
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStats = createAsyncThunk("stats/fetchStats", () => {
   
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
          return rejectWithValue(errorData); 
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message); 
      }
    }
  );
  export const fetchPlayerGameStats = createAsyncThunk(
    "stats/fetchPlayerGameStats",
    async (playerId, { rejectWithValue }) => {
      try {
        const response = await fetch(`/game_stats/player/${playerId}`);
        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(errorData); 
        }
  
        const data = await response.json();
        
        return data; 
      } catch (error) {
        return rejectWithValue(error.message); 
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
  
      return statId; 
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
          return rejectWithValue(errorData); 
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message); 
      }
    }
  );

const statSlice = createSlice({
  name: "stats",
  initialState: {
    entities: [], 
    status: "idle",
    error: null,
    playerGameStats: [],
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
    
    [fetchStats.pending](state) {
      state.status = "loading";
    },
    [fetchStats.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
    [addGameStat.fulfilled](state, action) {
      state.entities.push(action.payload); 
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
      [deleteGameStat.rejected](state, action) {
        state.status = "idle";
        state.error = action.payload;
      },
  
  [updateGameStat.fulfilled](state, action) {
    const updatedStat = action.payload;
    const index = state.entities.findIndex((stat) => stat.id === updatedStat.id);
    if (index !== -1) {
      state.entities[index] = updatedStat; 
    }
    state.error = null;
  },
  [updateGameStat.rejected](state, action){
    state.status= "idle";
    state.error = action.payload;
  },
  [fetchPlayerGameStats.fulfilled](state, action) {
    state.playerGameStats = action.payload; 
    state.error = null;
  },
  [fetchPlayerGameStats.rejected](state, action) {
    state.status = "idle";
    state.error = action.payload;
  },
  }})


export const { statAdded, statRemoved } = statSlice.actions;

export default statSlice.reducer;


