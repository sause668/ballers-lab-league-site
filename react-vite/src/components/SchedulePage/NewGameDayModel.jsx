import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./SchedulePage.css";

function NewGameDayModel() {
    const [message, setMessage] = useState(null);
    const [name, setName] = useState(null);
    const [location, setLocation] = useState('Mater Academy Charter Middle/High School, 7901 NW 103rd St, Hialeah Gardens, FL, 33016');
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState('13:00:00');
    const [endTime, setEndTime] = useState('18:00:00');
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        <div classLocation='inputCon'>
          <label htmlFor='location'>
            <p classLocation='labelTitle'>
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
        </div>
        {message?.errors.message && <p className='labelTitle error'>{message.errors.message}</p>}
        </form>
    </div>
  );
}

export default NewGameDayModel;