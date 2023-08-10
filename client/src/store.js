import { configureStore } from "@reduxjs/toolkit";

import teamsReducer from "./features/teams/teamsSlice";
//import reviewsReducer from "./features/reviews/reviewsSlice";

const store = configureStore({
  reducer: {
    teams: teamsReducer,
    //reviews: reviewsReducer,
  },
});

export default store;