import React from "react";
import { useDispatch } from "react-redux";
// import ReviewsContainer from "../reviews/ReviewsContainer";
import { teamRemoved } from "./teamsSlice";

function Team({ team }) {
  const dispatch = useDispatch();
  function handleDeleteClick() {
    dispatch(restaurantRemoved(team.id));
  }
  return (
    <div>
      <li>
        {team.name}
        <button onClick={handleDeleteClick}>DELETE Team</button>
        {/* <ReviewsContainer restaurantId={restaurant.id} /> */}
      </li>
    </div>
  );
}

export default Team;