import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { statAdded } from "./statSlice";

function StatInput() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleInputChange(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(statAdded(name));
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

export default StatInput;
