import { useState } from "react";
import { useModal } from "../../context/Modal";
import "./GameStatsPage.css";
import { useGame } from "../../context/Game";

function EditTeamStatModel({teamStat}) {
  const { editTeamStats } = useGame();
  const [points, setPoints] = useState(teamStat.points);
  const [message, setMessage] = useState(null);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    editTeamStats({gameId: teamStat.game_id, teamId: teamStat.team_id, points, setMessage})
    .then((res) => {if (res) closeModal();})
    .catch((err)=>setMessage({errors: {message: 'Error with request'}}));
  };



  return (
    
    <div className='formCon'>
        <h1 className='inputTitle'>{teamStat.team.name}</h1>
        <form onSubmit={handleSubmit}>
        {/* Points */}
        <div className='inputCon'>
          <label htmlFor='points'>
            <p className='labelTitle'>
              Points
            </p>
          </label>
          <input
            className='formInput'
            id="points"
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            required
          />
          {message?.errors.points && <p className='labelTitle error'>{message.errors.points}</p>}
        </div>
        <div className="submitCon">
            <button 
                className='submitButton'
                type="submit"
            >Submit</button>
        </div>
        {message?.errors.message && <p className='labelTitle error'>{message.errors.message}</p>}
        </form>
    </div>
  );
}

export default EditTeamStatModel;