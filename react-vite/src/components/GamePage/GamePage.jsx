import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./GamePage.css";
import { useGameDay } from "../../context/GameDay";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { SlLocationPin } from "react-icons/sl";
import { SlCalender } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";
import { FiPlus } from "react-icons/fi";

import { useUser } from "../../context/User";
import { useGame } from "../../context/Game";
import { apiFetchLight } from "../../context/fetches";
import RemoveTeamModel from "./RemoveTeamModel";
import AddTeamModel from "./AddTeam";


export default function GamePage() {
  const { user } = useUser();
  const nav = useNavigate();
  const { gameDayId, gameId } = useParams();
  const { game, gameById} = useGame();
  const { gamesList, gameDaysList, allGamesList, allGameDaysList } = useGameDay();
  const [gameDaySel, setGameDaySel] = useState(gameDayId);
  const [gameSel, setGameSel] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState(null);
  const teamSetup = [true, false];

  if (message) console.log(message);
  if (import.meta.env.MODE !== "production") {
    console.log('User', user);
    console.log('Game', game);
    console.log('GameDaysList', gameDaysList);
    console.log('GamesList', gamesList);
  }
  

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
    if (!isLoaded) gameById({gameId, setIsLoaded, setMessage})
    allGameDaysList({setMessage})
    allGamesList({gameDayId, setMessage})
  }, [gameById, allGameDaysList, allGamesList, gameId, gameDayId, isLoaded, setIsLoaded, setMessage]);

  return (
    <div id='mainConG'>
     {isLoaded && 
      <>
      {/* Title Info */}
        <h1 id='titleG'>Game Schedule & Scores</h1>
        <div id='selectMainConG'>
          <div className="selectConG">
            <select 
              name="gameDaySel" 
              id="gameDaySel" 
              className="selectG"
              value={gameDaySel} 
              onChange={(e) => gameDaySelChange(e)}
            >
              {gameDaysList && gameDaysList.map((gameDayOpt, index) => (
                <option value={gameDayOpt.id} key={`gameDaySelOpt${index}`}>{gameDayOpt.name}</option>
              ))}
            </select>
          </div>
          <div id="selectConG gameSelConG">
            <select 
              name="gameSel" 
              id="gameSel" 
              className="selectG gameSelG"
              value={gameSel} 
              onChange={(e) => gameSelChange(e)}
            >
              {gamesList && gamesList.map((gameOpt, index) => (
                <option value={gameOpt.id} key={`gameSelOpt${index}`}>{gameOpt.name}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Pregame */}
        <div id="preGameInfoConG">
          <h4 id="preGameTimeG">{game.start_time} {game.end_time}</h4>
          <h6 id="preGameDurG">1 hour</h6>
          <h3 id="preGameNameG">{game.name}</h3>
          <div id="preGameLocConG">
            <SlLocationPin id="preGameLocIconG"/>
            <h5 id="preGameLocInfoGD">Mater Academy Charter</h5>
          </div>
          {/* Pregame Teams */}
          <div id="preGameTeamsConG">
            {game.teams[0] ? 
              <div className="preGameTeamConG">
                <h5 className="preGameTeamG">{game.teams[0].team.name}</h5>
                {user && <OpenModalButton
                  buttonText={<IoMdClose className="buttonIcon" />}
                  modalComponent={<RemoveTeamModel gameId={game.id} team={teamStats.team} />}
                  cssClasses={'buttonG pregameBnG removeG'}
                />}
              </div>
            : 
            user && (<OpenModalButton
              buttonText={<FiPlus className="buttonIcon" />}
              modalComponent={<AddTeamModel gameId={game.id} />}
              cssClasses={'buttonG pregameBnG addG'}
            />)} 
            vs 
            {game.teams[1] ? 
              <div className="preGameTeamConG">
                <h5 className="preGameTeamG">{game.teams[1].team.name}</h5>
                {user && <OpenModalButton
                  buttonText={<IoMdClose className="buttonIcon" />}
                  modalComponent={<RemoveTeamModel gameId={game.id} team={teamStats.team} />}
                  cssClasses={'buttonG pregameBnG removeG'}
                />}
              </div>
            : 
            user && (<OpenModalButton
              buttonText={<FiPlus className="buttonIcon"/>}
              modalComponent={<AddTeamModel gameId={game.id} />}
              cssClasses={'buttonG pregameBnG addG'}
            />)}
          </div>
        </div>
        {/* Postgame */}
        <div id="gameInfoConG">
          <div id="gameDateConG">
            <SlCalender id="gameDateIconG"/>
            <h3 id="gameDateInfoG">{game.game_day.date}</h3>
          </div>
          <div id='gameLocConG'>
            <SlLocationPin id='gameLocIconG'/>
            <h3 id='gameLocInfoG'>{game.game_day.location}</h3>
          </div>
          <div className="gameListDivG"/>
          {/* Postgame Teams */}
          {teamSetup.map((isHome, index) => {
            const key = `noTeamConGame${index}`
            const teamStats = game.teams[index];

            if (!teamStats) return (<div className="teamConG noTeamG" key={key}>
              {user && <OpenModalButton
                buttonText={<FiPlus className="buttonIcon"/>}
                modalComponent={<AddTeamModel gameId={game.id} />}
                cssClasses={'buttonG postgameBnG addG'}
              />}
            </div>);

            return (<div className={`teamConG ${isHome && ''}`} key={key}>
              <div className="teamInfoConG">
                {user && <OpenModalButton
                  buttonText={<IoMdClose className="buttonIcon"/>}
                  modalComponent={<RemoveTeamModel gameId={game.id} team={teamStats.team} />}
                  cssClasses={'buttonG postgameBnG removeG'}
                />}
                <h3 className="teamInfoG">{teamStats.team.name} {teamStats.team.record}</h3>
              </div>
                
              <h3 className={`teamScoreG ${teamStats.win && 'winningTeamG'}`}>{teamStats.points}</h3>
            </div>);
          })}
          <div className="gameListDivG"/>
          {/* Options */}
          <a id="gameStatsLinkG" href={`/schedule/${gameDayId}/games/${gameId}/stats`}>
            <div id="gameStatsButtonG">View Stats</div>
          </a>
        </div>
      </>}
    </div>
  );
}