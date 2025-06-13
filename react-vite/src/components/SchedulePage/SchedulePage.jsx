import { useEffect, useState } from "react";
import "./SchedulePage.css";
import { useGameDay } from "../../context/GameDay";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useUser } from "../../context/User";
import NewGameDayModel from "./NewGameDayModel";
import EditGameDayModel from "./EditGameDayModel";

export default function SchedulePage() {
  const { user } = useUser();
  const { gameDays, allGameDays } = useGameDay();
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState(null);

  if (message) console.log(message);
  if (import.meta.env.MODE !== "production") {
    console.log('User', user);
    console.log('GameDays', gameDays);
  }
 
  
  useEffect(() => {
    if (!isLoaded) allGameDays({setIsLoaded, setMessage})
  }, [allGameDays, isLoaded, setIsLoaded, setMessage]);

  return (
    <div id='mainConS'>
     {isLoaded && 
      <>
        <h1 id='titleS'>Season 4 Schedule</h1>
        {user && <OpenModalButton
                buttonText={'New Game Day'}
                modalComponent={<NewGameDayModel />}
                cssClasses={'buttonS'}
              />}
        {gameDays.map((gameDay, index) => (
          <div className="cardS" key={`gameDayCard${index}`}>
            <div className="imgConS">
              <img className="imgS" src="" alt="" />
            </div>
            <div className="infoC">
              <h3 className='nameS'>{gameDay.name}</h3>
              <h4 className="dateS" >{gameDay.date}</h4>
              <div className="moreInfoToggleConS">
                <h5 className="moreInfoTextS">Show More</h5>
                <div className="moreInfoIconConS"><RiArrowDropDownLine /></div>
              </div>
              <div className="moreInfoConS">
                  <h5 className="dateTimeS">{`${gameDay.date}, ${gameDay.start_time}, ${gameDay.end_time}`}</h5>
                  <h5 className="location">{gameDay.location}</h5>
                </div>
              </div>
              <a href={`/schedule/${gameDay.id}`}><button className="buttonS">Learn More</button></a>
              {user && <OpenModalButton
                buttonText={'Edit Game Day'}
                modalComponent={<EditGameDayModel gameDay={gameDay} />}
                cssClasses={'buttonS'}
              />}
            </div>
        ))}
      </>}
    </div>
  );
}