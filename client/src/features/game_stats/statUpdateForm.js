import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateGameStat } from "./statSlice";


function StatUpdateForm() {
  const { statId } = useParams();
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.stats.entities);
  const statToUpdate = stats.find((stat) => stat.id === statId);

  console.log(stats)

  const [updatedStat, setUpdatedStat] = useState({
    // Initialize the form fields with the current data
    ERA: statToUpdate.ERA,
    K: statToUpdate.K,
    RBI: statToUpdate.RBI,
    // ... other fields
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedStat((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateGameStat({ id: statId, updatedStat }));
    // Redirect or handle success as needed
  };

  return (
    <div>
      <h2>Edit Stat</h2>
      <form onSubmit={handleSubmit}>
        <label>ERA:</label>
        <input
          type="number"
          step="0.01"
          name="ERA"
          value={updatedStat.ERA}
          onChange={handleInputChange}
        />
        {/* Other input fields */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default StatUpdateForm;
