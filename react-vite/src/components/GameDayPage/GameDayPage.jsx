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

  
  useEffect(() => {
    if (!isLoaded) gameDayById({gameDayId, setIsLoaded, setMessage})
  }, [gameDayById, gameDayId, isLoaded, setIsLoaded, setMessage]);

  return (
    <div id='mainConGD'>
     {isLoaded && 
      <>
        <h1 id='titleGD'>Schedule</h1>
        <h5 id='disNameGD'>{gameDay.name}</h5>
        <h5 id='disDateGD'>{gameDay.date}{gameDay.start_time}{gameDay.end_time}</h5>
        <h5 id='disLocationGD'>{gameDay.location}</h5>
        {user && <OpenModalButton
          buttonText={'New Game'}
          modalComponent={<NewGameModel gameDayId={gameDayId}/>}
          cssClasses={'buttonS'}
        />}
        <h3 id='dateGD'>{gameDay.date}</h3>
        <div className="border"></div>
        {gameDay.games.map((game, index) => (
          <div className="gameInfoConGD" key={`gameInfo${index}`}>
            <h4 className="gameTimeGD">{game.start_time} {game.end_time}</h4>
            <h6 className="gameDurGD">1 hour</h6>
            <h3 className="gameNameGD">{game.name}</h3>
            <h5 className="gameLocationGD"><SlLocationPin />Mater Academy Charter</h5>
            <a href={`/schedule/${gameDay.id}/games/${game.id}`}><h4>Show More</h4><SlArrowRight /></a>
            {user && <OpenModalButton
              buttonText={'Edit Game'}
              modalComponent={<EditGameModel game={game}/>}
              cssClasses={'buttonS'}
            />}
            <div className="borderGD"></div>
          </div>
        ))}
      </>}
    </div>
  );
}