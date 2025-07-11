import { useState } from "react";
import { useModal } from "../../context/Modal";
import "./GameDayPage.css";
import { useGameDay } from "../../context/GameDay";

function NewGameModel({gameDayId}) {
  const { newGame } = useGameDay();
  const [message, setMessage] = useState(null);
  const [name, setName] = useState('');
  const [division, setDivision] = useState('Hoopers');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    newGame({gameDayId, name, startTime, division, endTime, setMessage})
    .then((res) => {if (res) closeModal();})
    .catch(()=>setMessage({errors: {message: 'Error with request'}}));
  };



  return (
    
    <div className='formCon'>
        <h1 className='inputTitle'>New Game</h1>
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
        {/* Division */}
        <div className='inputCon'>
            <select 
                name="division" 
                id="division" 
                className="formInput"
                value={division} 
                onChange={(e) => setDivision(e.target.value)}
            >
              <option value={`Hoopers`}>Hoopers</option>
              <option value={`Elite`}>Elite</option>
            </select>
        </div>
        {/* Start Time */}
        <div className='inputCon'>
          <label htmlFor='startTime'>
            <p className='labelTitle'>
              Start Time
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
              End Time
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
        </div>
        {message?.errors.message && <p className='labelTitle error'>{message.errors.message}</p>}
        </form>
    </div>
  );
}

export default NewGameModel;