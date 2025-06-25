import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./GameDayPage.css";
import { useGameDay } from "../../context/GameDay";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { SlLocationPin } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { useUser } from "../../context/User";
import NewGameModel from "./NewGameModel";
import EditGameModel from "./EditGameModel";
import { convDate, convLoc, convTime, sortGames } from "../../utils/format-convesions";

export default function GameDayPage() {
  const { user } = useUser();
  const { gameDayId } = useParams();
  const { gameDay, gameDayById } = useGameDay();
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState(null);

  if (message) console.log(message);
  if (import.meta.env.MODE !== "production") {
    console.log('User', user);
    console.log('GameDay', gameDay);
  }

  const newDate = gameDay && convDate(gameDay.date);
  const newDateF = newDate && newDate.slice(0, newDate.length - 4);
  const newStartTimeGD = gameDay && convTime(gameDay.start_time);
  const newEndTimeGD = gameDay && convTime(gameDay.end_time);
  const newLocation = gameDay && convLoc(gameDay.location)

  
  useEffect(() => {
    if (!isLoaded) gameDayById({gameDayId, setIsLoaded, setMessage})
  }, [gameDayById, gameDayId, isLoaded, setIsLoaded, setMessage]);

  return (
    <div id="gameDayCon">
     {isLoaded && 
      <div id='mainConGD' className="fadein">
        <div id="infoConGD">
          <h1 id='titleGD'>Schedule</h1>
          <h5 id='disNameGD'>{gameDay.name}</h5>
          <h5 id='disDateGD'>{newDate} {newStartTimeGD} - {newEndTimeGD}</h5>
          <h5 id='disLocationGD'>{newLocation[0]}</h5>
          <h5 id='disLocationGD'>{newLocation[1]}, {newLocation[2]}, {newLocation[3]}, {newLocation[4]}</h5>
          {user && <OpenModalButton
            buttonText={'New Game'}
            modalComponent={<NewGameModel gameDayId={gameDayId}/>}
            cssClasses={'buttonGD newGD'}
          />}
        </div>
        
        <h2 id='dateGD'>{newDateF}</h2>
        <div className="borderGD"></div>
        {gameDay.games
        .sort((a,b)=>sortGames(a,b))
        .map((game, index) => {
          const newStartTimeG = convTime(game.start_time);
          const newEndTimeG = convTime(game.end_time);
          return(
          <div className="gameInfoConGD" key={`gameInfo${index}`}>
            <div className="gameInfoSubCon1GD">
              <h4 className="gameTimeGD">{newStartTimeG} - {newEndTimeG}</h4>
              <h6 className="gameDurGD">1 hour</h6>
            </div>
            <div className="gameInfoSubCon2GD">
              <h3 className="gameNameGD">{game.name}</h3>
              <div className="gameLocConGE">
                <SlLocationPin className="gameLocIconGD"/>
                <h5 className="gameLocGD">Mater Academy Charter</h5>
              </div>
              <div className="optionsConGD">
                <a className="gameLinkGD" href={`/schedule/${gameDay.id}/games/${game.id}`}>
                  <h4 className="gameLinkInfoGD">Show More</h4>
                  <SlArrowRight className="gameLinkIconGD"/>
                </a>
                {user && <OpenModalButton
                  buttonText={'Edit Game'}
                  modalComponent={<EditGameModel game={game}/>}
                  cssClasses={'buttonGD editGD'}
                />}
              </div>
            </div>
            <div className="borderGD"></div>
          </div>
        )})}
      </div>}
    </div>
  );
}