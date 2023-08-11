import { configureStore } from "@reduxjs/toolkit";

import teamsReducer from "./features/teams/teamsSlice";
import statsReducer from "./features/game_stats/statSlice";

const store = configureStore({
  reducer: {
    teams: teamsReducer,
    stats: statsReducer,
  },
});

export default store;