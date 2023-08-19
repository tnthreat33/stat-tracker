import { configureStore } from "@reduxjs/toolkit";

import teamsReducer from "./features/teams/teamsSlice";
import statsReducer from "./features/game_stats/statSlice";
import authSlice from "./features/user/authSlice";

const store = configureStore({
  reducer: {
    teams: teamsReducer,
    stats: statsReducer,
    users: authSlice,
  },
});

export default store;