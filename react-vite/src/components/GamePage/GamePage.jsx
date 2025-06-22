import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./GamePage.css";
import { useGameDay } from "../../context/GameDay";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { SlLocationPin } from "react-icons/sl";
import { SlCalender } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { BiSolidBasketball } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

import { useUser } from "../../context/User";
import { useGame } from "../../context/Game";
import { apiFetchLight } from "../../context/fetches";
import RemoveTeamModel from "./RemoveTeamModel";
import AddTeamModel from "./AddTeam";
import { convDateFull, convTime } from "../../utils/format-convesions";


export default function GamePage() {
  const { user } = useUser();
  const nav = useNavigate();
  const { gameDayId, gameId } = useParams();
  const { game, gameById, importStats} = useGame();
  const { gamesList, gameDaysList, allGamesList, allGameDaysList } = useGameDay();
  const [gameDaySel, setGameDaySel] = useState(gameDayId);
  const [gameSel, setGameSel] = useState(false);
  const [statsChecked, setStatsChecked] = useState(game?.stats_imported);
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState(null);
  const teamSetup = [0, 1];
  // const gameDate = new Date(game?.game_day.date.split('-')).getTime();
  // const dateNow = new Date().getTime();

  const isPlayed = game && game.played;

  const newDate = game && convDateFull(game.game_day.date);
  const newDateF = newDate && newDate.slice(0, newDate.length - 6);
  const newStartTime = game && convTime(game.start_time);
  const newEndTime = game && convTime(game.end_time);

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

  function sortGames(game1, game2) {
    const time1 = parseFloat(game1.start_time.slice(0,3));
    const time2 = parseFloat(game2.start_time.slice(0,3));

    return time1 - time2;
  }
  
  useEffect(() => {
      if (!isLoaded) {
        gameById({gameId, setIsLoaded, setMessage})
        allGameDaysList({setMessage})
        allGamesList({gameDayId, setMessage})
      }
      else if (!statsChecked) {
        if (isPlayed) {
          importStats({gameId, setMessage})
            .then((res) => {
              if (res) gameById({gameId, setIsLoaded, setMessage});
            });
        }
        setStatsChecked(true);
      }
    
  }, [gameById, allGameDaysList, allGamesList, importStats, gameId, gameDayId, isLoaded, setIsLoaded, setMessage, statsChecked, isPlayed]);

  return (
    <>
     {isLoaded && 
      <div id='mainConG' className="fadein">
      {/* Title Info */}
        <div id="titleConG">
          <BiSolidBasketball id="titleIconG"/>
          <h1 id='titleG'>Game Schedule & Scores</h1>
        </div>
        
        <div id='selectMainConG'>
          <CiCalendar id="selectIconG"/>
          <div className="selectConG">
            <select 
              name="gameDaySel" 
              id="gameDaySel" 
              className="selectG"
              value={gameDaySel} 
              onChange={(e) => gameDaySelChange(e)}
            >
              {gameDaysList && gameDaysList.map((gameDayOpt, index) => (
                <option 
                  className="optionG" 
                  value={gameDayOpt.id} 
                  key={`gameDaySelOpt${index}`}
                >
                  {gameDayOpt.name.substr(gameDayOpt.name.search('Week'), gameDayOpt.name.length)}
                </option>
              ))}
            </select>
            <IoIosArrowDown className="selIconG"/>
          </div>
          <div className="selectConG gameSelConG">
            <select 
              name="gameSel" 
              id="gameSel" 
              className="selectG gameSelG"
              value={gameSel} 
              onChange={(e) => gameSelChange(e)}
            >
              {gamesList && gamesList
                .sort((a, b)=> sortGames(a, b))
                .map((gameOpt, index) => (
                <option value={gameOpt.id} key={`gameSelOpt${index}`}>{gameOpt.name.replace('Division ', '')}</option>
              ))}
            </select>
            <IoIosArrowDown className="selIconG"/>
          </div>
        </div>
        {!isPlayed ? 
        // Pregame
        <div id="preGameInfoConG">
          <h4 id="preGameTimeG">{newStartTime} {newEndTime}</h4>
          <h6 id="preGameDurG">1 hour</h6>
          <h3 id="preGameNameG">{game.name}</h3>
          <div id="preGameLocConG">
            <SlLocationPin id="preGameLocIconG"/>
            <h5 id="preGameLocInfoGD">Mater Academy Charter</h5>
          </div>
          {/* Pregame Teams */}
          {teamSetup.map(isHome => game.teams[isHome] && 
            <div id="preGameTeamsConG" key={`preGameTeamsConG${isHome}`}>
            {game.teams[isHome] ? 
              <div className="preGameTeamConG">
                {user && <OpenModalButton
                  buttonText={<IoMdClose className="buttonIconG" />}
                  modalComponent={<RemoveTeamModel gameId={game.id} team={game.teams[isHome].team} />}
                  cssClasses={'buttonG pregameBnG removeG'}
                />}
                <h5 className="preGameTeamG">{game.teams[isHome].team.name}</h5>
                {isHome == 0 && <h3 className="preGameVsG">vs</h3>}
              </div>
            : 
            <div className="preGameTeamConG">
            {user && <OpenModalButton
              buttonText={<FiPlus className="buttonIcon" />}
              modalComponent={<AddTeamModel gameId={game.id} />}
              cssClasses={'buttonG pregameBnG addG'}
            />}
            {isHome == 0 && <h3 className="preGameVsG">vs</h3>}
            </div>} 
          </div>
          )}
        </div>
        :
          // Postgame
        <div id="gameInfoConG">
          <div id="gameInfoSubConG">
            <div id="gameDateConG">
              <SlCalender id="gameDateIconG"/>
              <h3 id="gameDateInfoG">{newDateF}</h3>
            </div>
            <div id='gameLocConG'>
              <SlLocationPin id='gameLocIconG'/>
              <h3 id='gameLocInfoG'>Mater Academy Charter</h3>
            </div>
            
          </div>
          <div className="gameListDivG"/>
          {/* Postgame Teams */}
          <div id="teamsMainConG">
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
                  <h3 className="teamInfoG"><b>{teamStats.team.name}</b>{` ${teamStats.team.record}`}</h3>
                </div>
                  
                <h3 className={`teamScoreG ${teamStats.win && 'winningTeamG'}`}>{teamStats.points}</h3>
              </div>);
            })}
          </div>
          <div className="gameListDivG"/>
          {/* Options */}
          <div id="gameStatsConG">
            <a id="gameStatsLinkG" href={`/schedule/${gameDayId}/games/${gameId}/stats`}>
              <h3 id="gameStatsLinkTextG">View Stats</h3>
            </a>
          </div>
        </div>
        }
      </div>}
    </>
  );
}