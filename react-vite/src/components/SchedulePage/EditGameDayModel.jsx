import { useState } from "react";
import { useModal } from "../../context/Modal";
import "./SchedulePage.css";
import DeleteGameDayModel from "./DeleteGameDayModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useGameDay } from "../../context/GameDay";

function EditGameDayModel({gameDay}) {
  const { editGameDay } = useGameDay();
    const [message, setMessage] = useState(null);
    const [name, setName] = useState(gameDay.name);
    const [location, setLocation] = useState(gameDay.location);
    const [date, setDate] = useState(gameDay.date);
    const [startTime, setStartTime] = useState(gameDay.start_time.slice(0, 5));
    const [endTime, setEndTime] = useState(gameDay.end_time.slice(0, 5));
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    editGameDay({gameDayId: gameDay.id, name, location, date, startTime, endTime, setMessage})
    .then((res) => {if (res) closeModal();})
    .catch(()=>setMessage({errors: {message: 'Error with request'}}));
  };



  return (
    
    <div className='formCon'>
        <h1 className='inputTitle'>Edit Game Day</h1>
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
        {/* Location */}
        <div className='inputCon'>
          <label htmlFor='location'>
            <p className='labelTitle'>
              Location
            </p>
          </label>
          <input
            className='formInput'
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          {message?.errors.name && <p className='labelTitle error'>{message.errors.name}</p>}
        </div>
        {/* Due Date */}
        <div className='inputCon'>
          <label htmlFor='date'>
            <p className='labelTitle'>
              Date
            </p>
          </label>
          <input
            className='formInput'
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          {message?.errors.due_date && <p className='labelTitle error'>{message.errors.due_date}</p>}
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
              modalComponent={<DeleteGameDayModel gameDay={gameDay} />}
              cssClasses={''}
            />
        </div>
        {message?.errors.message && <p className='labelTitle error'>{message.errors.message}</p>}
        </form>
    </div>
  );
}

export default EditGameDayModel;