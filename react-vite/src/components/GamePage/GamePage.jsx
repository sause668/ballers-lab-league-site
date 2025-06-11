import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./GamePage.css";
import { useGameDay } from "../../context/GameDay";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { SlLocationPin } from "react-icons/sl";
import { SlCalender } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";
import { FiPlus } from "react-icons/fi";

import { RiArrowDropDownLine } from "react-icons/ri";
import { useUser } from "../../context/User";
import { useGame } from "../../context/Game";
import { apiFetch, apiFetchLight } from "../../context/fetches";
import RemoveTeamModel from "./RemoveTeamModel";
import AddTeamModel from "./AddTeam";
import { useTeam } from "../../context/Team";


export default function GamePage() {
  // const { user } = useUser();
  const nav = useNavigate();
  const { gameDayId, gameId } = useParams();
  const { game, gameById} = useGame();
  const { gamesList, gameDaysList, allGamesList, allGameDaysList } = useGameDay();
  const [gameDaySel, setGameDaySel] = useState(gameDayId);
  const [gameSel, setGameSel] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState(null);
  const teamSetup = [true, false];
  const user = {id: 1, username: 'sauce'}

  console.log('User', user);
  console.log('Game', game);
  console.log('GameDaysList', gameDaysList);
  console.log('GamesList', gamesList);

  async function gameDaySelChange(e) {
    const gameDaySelId = e.target.value;
    const res = await apiFetchLight(`/api/game-days/${e.target.value}/games/list/first`, {}, setMessage);
    if (res?.gamesListFirst) {
      nav(`/schedule/${gameDaySelId}/games/${res.gamesListFirst.id}`)
      setGameDaySel(gameDaySelId)
      gameById({gameId: res.gamesListFirst.id, setIsLoaded, setMessage})
      allGamesList({gameDayId: gameDaySelId, setMessage})
  }}

  async function gameSelChange(e) {
    const gameSelId = e.target.value;
    nav(`/schedule/${gameDayId}/games/${gameSelId}`)
    setGameSel(gameSelId)
    gameById({gameId: gameSelId, setIsLoaded, setMessage})
    allGamesList({gameDayId, setMessage})
  }
  
  useEffect(() => {
    gameById({gameId, setIsLoaded, setMessage})
    allGameDaysList({setMessage})
    allGamesList({gameDayId, setMessage})
  }, []);

  return (
    <div id='mainConG'>
     {isLoaded && 
      <>
        <h1 id='titleG'>Game Schedule & Scores</h1>
        <div id='selectConG'>
          <div id="gameDaySelConG">
            <select 
              name="gameDaySel" 
              id="gameDaySel" 
              className="gameDaySelG"
              value={gameDaySel} 
              onChange={(e) => gameDaySelChange(e)}
            >
              {gameDaysList && gameDaysList.map((gameDayOpt, index) => (
                <option value={gameDayOpt.id} key={`gameDaySelOpt${index}`}>{gameDayOpt.name}</option>
              ))}
            </select>
          </div>
          <div id="gameSelConG">
            <select 
              name="gameSel" 
              id="gameSel" 
              className="gameSelG"
              value={gameSel} 
              onChange={(e) => gameSelChange(e)}
            >
              {gamesList && gamesList.map((gameOpt, index) => (
                <option value={gameOpt.id} key={`gameSelOpt${index}`}>{gameOpt.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div id="preGameInfoConG">
        <h4 className="gameTimeGD">{game.start_time} {game.end_time}</h4>
            <h6 className="gameDurGD">1 hour</h6>
            <h3 className="gameNameGD">{game.name}</h3>
            <h5 className="gameLocationGD"><SlLocationPin />Mater Academy Charter</h5>
            <h3 className="preGameTeams">{game.teams[0] ? game.teams[0].team.name: (<OpenModalButton
                buttonText={<FiPlus />}
                modalComponent={<AddTeamModel gameId={game.id} />}
                cssClasses={''}
              />)} vs {game.teams[1] ? game.teams[1].team.name: (<OpenModalButton
                buttonText={<FiPlus />}
                modalComponent={<AddTeamModel gameId={game.id} />}
                cssClasses={''}
              />)}</h3>
        </div>
        <div id="gameInfoConG">
          <h3 id="gameDateG"><SlCalender />{game.game_day.date}</h3>
          <h3 id='gameLocationG'><SlLocationPin />{game.game_day.location}</h3>
          <div className="gameListDivG"/>
          {teamSetup.map((isHome, index) => {
            const key = `noTeamConGame${index}`
            const teamStats = game.teams[index];

            if (!teamStats) return (<div className="teamConG noTeam" key={key}>
              {user && <OpenModalButton
                buttonText={<FiPlus />}
                modalComponent={<AddTeamModel gameId={game.id} />}
                cssClasses={''}
              />}
            </div>);

            return (<div className="teamConG homeTeam" key={key}>
              <div className="teamInfoConG">
                <OpenModalButton
                  buttonText={<IoMdClose />}
                  modalComponent={<RemoveTeamModel gameId={game.id} team={teamStats.team} />}
                  cssClasses={''}
                />
                <h3 className="teamInfoG">{teamStats.team.name} {teamStats.team.record}</h3>
              </div>
                
              <h3 className={`teamScoreG ${teamStats.win && 'winningTeam'}`}>{teamStats.points}</h3>
            </div>);
          })}
          <div className="gameListDivG"/>
          <a href={`/schedule/${gameDayId}/games/${gameId}/stats`}>
            <div className="gameStatsButtonG">View Stats</div>
          </a>
        </div>
      </>}
    </div>
  );
}