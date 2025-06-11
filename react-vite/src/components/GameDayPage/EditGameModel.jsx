import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./GameDayPage.css";
import DeleteGameDayModel from "./DeleteGameModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteGameModel from "./DeleteGameModal";
import { useGameDay } from "../../context/GameDay";

function EditGameModel({game}) {
  const { editGame } = useGameDay();
    const [message, setMessage] = useState(null);
    const [name, setName] = useState(game.name);
    const [startTime, setStartTime] = useState(game.start_time.slice(0, 5));
    const [endTime, setEndTime] = useState(game.end_time.slice(0, 5));
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    editGame({gameDayId: game.game_day_id, gameId: game.id, name, startTime, endTime, setMessage})
    .then((res) => {if (res) closeModal();})
    .catch((err)=>setMessage({errors: {message: 'Error with request'}}));
  };



  return (
    
    <div className='formCon'>
        <h1 className='inputTitle'>Edit Game</h1>
        <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className='inputCon'>
          <label htmlFor='name'>
            <p className='labelTitle'>
              Name
            </p>
          </label>
          <input
            className='formInput'
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {message?.errors.name && <p className='labelTitle error'>{message.errors.name}</p>}
        </div>
        {/* Start Time */}
        <div className='inputCon'>
          <label htmlFor='startTime'>
            <p className='labelTitle'>
              Due Date
            </p>
          </label>
          <input
            className='formInput'
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          {message?.errors.start_time && <p className='labelTitle error'>{message.errors.start_time}</p>}
        </div>
        {/* Start Time */}
        <div className='inputCon'>
          <label htmlFor='endTime'>
            <p className='labelTitle'>
              Due Date
            </p>
          </label>
          <input
            className='formInput'
            id="endTime"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
          {message?.errors.end_time && <p className='labelTitle error'>{message.errors.end_time}</p>}
        </div>
        <div className="submitCon">
            <button 
                className='submitButton'
                type="submit"
                disabled={
                  (!name?.length)
                }
            >Submit</button>
            <OpenModalButton
              buttonText={'Delete'}
              modalComponent={<DeleteGameModel game={game} />}
              cssClasses={''}
            />
        </div>
        {message?.errors.message && <p className='labelTitle error'>{message.errors.message}</p>}
        </form>
    </div>
  );
}

export default EditGameModel;