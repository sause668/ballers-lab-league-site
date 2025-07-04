import { useState } from "react";
import { useModal } from "../../context/Modal";
import "./SchedulePage.css";
import { useGameDay } from "../../context/GameDay";

function NewGameDayModel() {
    const { newGameDay } = useGameDay();
    const [message, setMessage] = useState(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('Mater Academy Charter Middle/High School, 7901 NW 103rd St, Hialeah Gardens, FL, 33016');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('13:00');
    const [endTime, setEndTime] = useState('18:00');
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    newGameDay({name, location, date, startTime, endTime, setMessage})
    .then((res) => {if (res) closeModal();})
    .catch(()=>setMessage({errors: {message: 'Error with request'}}));
    
  };



  return (
    
    <div className='formCon'>
        <h1 className='inputTitle'>New Game Day</h1>
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
        {/* Date */}
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
          {startTime}
        </div>
        {/* End Time */}
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

export default NewGameDayModel;