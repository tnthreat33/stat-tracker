import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPlayer } from "./playersSlice";
import { fetchTeams } from "../teams/teamsSlice";
import "../teams/yourTeam.css"; 

function PlayerInput({ team }) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [graduation_year, setGradYear] = useState("");
  const [dominate_hand, setDominateHand] = useState("");
  const [jersey_number, setJerseyNumber] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.players.error) || [];
  const navigate = useNavigate();
  const id = team.id;

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handlePositionChange(event) {
    setPosition(event.target.value);
  }
  function handleGradYearChange(event) {
    setGradYear(event.target.value);
  }
  function handleDominateHandChange(event) {
    setDominateHand(event.target.value);
  }
  function handleJerseyNumberChange(event) {
    setJerseyNumber(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPlayer = {
      name,
      position,
      graduation_year,
      dominate_hand,
      jersey_number,
      team_id: id,
    };

    try {
      const response = await dispatch(addPlayer(newPlayer));

      if (response.payload) {
        navigate(`/teams/${team.name}`);
      }

      dispatch(fetchTeams());

      setName("");
      setPosition("");
      setDominateHand("");
      setGradYear("");
      setJerseyNumber("");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login-form-container"> 
      <form onSubmit={handleSubmit}>
        <div className="ui input">
          <label>
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
            />
          </label>
        </div>
        <div className="ui input"> 
          <label>
            Graduation Year
            <input
              type="number"
              name="name"
              value={graduation_year}
              onChange={handleGradYearChange}
            />
          </label>
        </div>
        <div className="ui input"> 
          <label>
            Position
            <input
              type="text"
              name="name"
              value={position}
              onChange={handlePositionChange}
            />
          </label>
        </div>
        <div className="ui input"> 
          <label>
            Dominate Hand
            <input
              type="text"
              name="name"
              value={dominate_hand}
              onChange={handleDominateHandChange}
            />
          </label>
        </div>
        <div className="ui input"> 
          <label>
            Jersey Number
            <input
              type="number"
              name="name"
              value={jersey_number}
              onChange={handleJerseyNumberChange}
            />
          </label>
        </div>
        <button className="ui red button" type="submit"> 
          Add Player
        </button>
      </form>
      {error.error && error.error.length > 0 && (
        <div>
          <p>Errors:</p>
          <ul>
            {error.error.map((errorMessage, index) => (
              <li key={index}>{errorMessage}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PlayerInput;
