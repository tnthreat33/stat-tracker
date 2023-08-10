import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { teamAdded } from "./teamsSlice";

function TeamInput() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleInputChange(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(teamAdded(name));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Add Team</button>
    </form>
  );
}

export default TeamInput;
