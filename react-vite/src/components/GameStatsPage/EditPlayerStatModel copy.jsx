import { useState } from "react";
import { useModal } from "../../context/Modal";
import "./GameStatsPage.css";

function EditPlayerStatModel({playerStat}) {
  const [points, setPoints] = useState(playerStat.points);
  const [rebounds, setRebounds] = useState(playerStat.rebounds);
  const [assists, setAssists] = useState(playerStat.assists);
  const [message, setMessage] = useState(null);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };



  return (
    
    <div className='formCon'>
        <h1 className='inputTitle'>{playerStat.player.first_name} {playerStat.player.last_name}</h1>
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
        {/* Rebounds */}
        <div className='inputCon'>
          <label htmlFor='rebounds'>
            <p className='labelTitle'>
              Rebounds
            </p>
          </label>
          <input
            className='formInput'
            id="rebounds"
            type="number"
            value={rebounds}
            onChange={(e) => setRebounds(e.target.value)}
            required
          />
          {message?.errors.rebounds && <p className='labelTitle error'>{message.errors.rebounds}</p>}
        </div>
        {/* Assists */}
        <div className='inputCon'>
          <label htmlFor='assists'>
            <p className='labelTitle'>
              Assists
            </p>
          </label>
          <input
            className='formInput'
            id="assists"
            type="number"
            value={assists}
            onChange={(e) => setAssists(e.target.value)}
            required
          />
          {message?.errors.assists && <p className='labelTitle error'>{message.errors.assists}</p>}
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

export default EditPlayerStatModel;