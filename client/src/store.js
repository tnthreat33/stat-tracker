import { configureStore } from "@reduxjs/toolkit";

import teamsReducer from "./features/teams/teamsSlice";
import statsReducer from "./features/game_stats/statSlice";
import authReducer from "./features/user/authSlice";
import playersReducer from "./features/players/playersSlice";
import gamesReducer from "./features/games/gamesSlice";

const store = configureStore({
  reducer: {
    teams: teamsReducer,
    stats: statsReducer,
    auth: authReducer,
    players: playersReducer,
    games: gamesReducer,
  },
});

export default store;