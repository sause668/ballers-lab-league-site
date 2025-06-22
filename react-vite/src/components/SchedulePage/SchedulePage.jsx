import { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';

import "./SchedulePage.css";
import { useGameDay } from "../../context/GameDay";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useUser } from "../../context/User";
import NewGameDayModel from "./NewGameDayModel";
import EditGameDayModel from "./EditGameDayModel";
import { convDate, convLoc, convTime } from "../../utils/format-convesions";


export default function SchedulePage() {
  const deskTop = !useMediaQuery({ query: '(max-width: 600px)' });
  const { user } = useUser();
  const { gameDays, allGameDays } = useGameDay();
  const [menu, setMenu] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState(null);
  let url = import.meta.env.MODE === "production" ? '/disk':''

  if (message) console.log(message);
  if (import.meta.env.MODE !== "production") {
    console.log('User', user);
    console.log('GameDays', gameDays);
  }

  function toggleMenu(gameDayId) {
    if (menu !== gameDayId) setMenu(gameDayId);
    else setMenu('');
  }
 
  
  useEffect(() => {
    if (!isLoaded) allGameDays({setIsLoaded, setMessage})
  }, [allGameDays, isLoaded, setIsLoaded, setMessage]);

  return (
    <>
     {isLoaded && 
      <div id='mainConS' className="fadein">
        <h1 id='titleS'>Season 4 Schedule</h1>
        {user && <OpenModalButton
          buttonText={'New Game Day'}
          modalComponent={<NewGameDayModel />}
          cssClasses={'buttonS newS'}
        />}
        <div id="cardsConS">
          {gameDays.map((gameDay, index) => {
              const newDate = convDate(gameDay.date);
              const newDateF = newDate.slice(0, newDate.length - 4)
              const newStartTime = convTime(gameDay.start_time);
              const newEndTime = convTime(gameDay.end_time);
              const newLocation = convLoc(gameDay.location)

            return (
            <div className="cardS" key={`gameDayCard${index}`}>
              {deskTop && 
                <div className={`moreInfoConS ${menu !== gameDay.id && 'hidden'} fadein`}>
                  <div className='infoCloseConS'>
                    <IoMdClose 
                      className="infoCloseIconS" 
                      onClick={()=>setMenu('')}
                    />
                  </div>
                  <h3 className='nameS nameMS'>{gameDay.name}</h3>
                  {/* <h4 className="dateS" >{gameDay.date}</h4> */}
                  <h5 className="dateTimeS dateTimeMS">{`${newDate}, ${newStartTime} - ${newEndTime}`}</h5>
                  <h5 className="locationS locationMS">{newLocation[0]}</h5>
                  <h5 className="locationS locationMS">{newLocation[1]}, {newLocation[2]}, {newLocation[3]}, {newLocation[4]}</h5>
                </div>
              }
              <div className="imgConS">
                <img className="imgS" src={`${url}/imgs/game-day.jpg`} alt="Game Day Pic" />
              </div>
              <div className={`infoCon ${menu == gameDay.id && 'hiddenS'}`}>
                <h3 className='nameS'>{gameDay.name}</h3>
                <h4 className="dateS" >{newDateF}</h4>
                <div className="moreInfoToggleConS" onClick={() => toggleMenu(gameDay.id)}>
                  <h5 className="moreInfoTextS">{menu == gameDay.id ? 'Less Info':'More Info'}</h5>
                  <div className="moreInfoIconConS" >
                    <RiArrowDropDownLine className={`moreInfoIconS ${menu == gameDay.id ? 'rotate':'rotateBack'}`}/>
                  </div>
                </div>
                {!deskTop && 
                  <div className={`moreInfoConS ${menu !== gameDay.id && 'hidden'}`}>
                      <h5 className="dateTimeS">{`${newDate}, ${newStartTime}, ${newEndTime}`}</h5>
                      <h5 className="locationS">{newLocation[0]}</h5>
                      <h5 className="locationS">{newLocation[1]}, {newLocation[2]}, {newLocation[3]}, {newLocation[4]}</h5>
                  </div>
                }
              </div>
              <a className="buttonConS" href={`/schedule/${gameDay.id}`}><button className="buttonS linkS">Learn More</button></a>
              {user && <OpenModalButton
                buttonText={'Edit Game Day'}
                modalComponent={<EditGameDayModel gameDay={gameDay} />}
                cssClasses={'buttonS editS'}
              />}
              </div>
          )})}
        </div>
      </div>}
    </>
  );
}