import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./GameStatsPage.css";
import { useGame } from "../../context/Game";
import { useUser } from "../../context/User";
import { useModal } from "../../context/Modal";
import EditTeamStatModel from "./EditTeamStatModel";
import EditPlayerStatModel from "./EditPlayerStatModel";

export default function GameStatsPage() {
  const { gameId } = useParams();
  const { user } = useUser();
  const {gameStats, gameByIdStats } = useGame();
  const teamStats = [
    gameStats?.team_stats[0],
    gameStats?.team_stats[1]
  ];
  const playerStats = [
    teamStats[0] && gameStats.player_stats.filter(playerStat => playerStat.player.team_id == teamStats[0].team.id),
    teamStats[1] && gameStats.player_stats.filter(playerStat => playerStat.player.team_id == teamStats[1].team.id)
  ];

  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState(null);

  if (import.meta.env.MODE !== "production") {
    if (message) console.log(message);
    console.log('User', user);
    console.log('GameStats', gameStats);
  }

  const tableHeaders = ['Players', 'PPG', 'RPG', 'APG'];
  const tableBody = ['points', 'rebounds', 'assists'];

  const { setModalContent } = useModal();
  
  useEffect(() => {
    if (!isLoaded) gameByIdStats({gameId, setIsLoaded, setMessage})
  }, [gameByIdStats, gameId, isLoaded, setIsLoaded, setMessage]);

  return (
    <>
     {isLoaded && (<div id="gameStatsConGS">
      <div id="teamStatsConGS">
        {teamStats.map((teamStat, index) => (
        <div className={`teamStatConGS ${index == 0 && 'home'}`} key={`teamStatsGS${index}`}>
          {teamStat && <>
            <div className="teamInfoConGS">
              <h2 className="teamNameGS">{teamStat.team.name}</h2>
              <h4 className="teamRecordGS">{teamStat.team.record}</h4>
            </div>
            <h1 
              className="teamPointGS" 
              onClick={()=>user && setModalContent(<EditTeamStatModel teamStat={teamStat} />)}
            >{teamStat.points}</h1>
          </>}
        </div>
      ))}
      </div>
      <div id='playerStatsConGS'>
        {playerStats.map((playerTeamStats, iPlayerTeamStats) => {
          if (playerTeamStats) return(
            <div className="playerTeamStatsConGS" key={`playerTeamStatsGS${iPlayerTeamStats}`}>
              <h2 className="playerTeamNameGS">{teamStats[iPlayerTeamStats].team.name}</h2>
              <div className="tableConGS">
                <table id="tableGS">
                  <thead id="tableHeadGS">
                    <tr id="tableHeadRowGS">
                      {tableHeaders.map((header, iHeader) => (
                        <td className="tableCellGS tableHeadCellGS" key={`tableHeadGS${iHeader}`}>{header}</td>
                      ))}
                    </tr>
                  </thead>
                  <tbody id="tableBodyGB">
                    {playerTeamStats.map((playerStat, iPlayerStat) => (
                      <tr className="tableBodyRowGS" key={`playerStatRow${iPlayerStat}`}>
                        <td className="tableCellGS tableBodyCellGS playerInfoCellGS">
                          <h6 className="playerNumberGS">{playerStat.player.number}</h6>
                          <a href="" className="playerLinkGS">
                            <h6 className="playerNameGS">{playerStat.player.first_name} {playerStat.player.last_name}</h6>
                          </a>
                        </td>
                        {tableBody.map((stat, iStat) => (
                          <td 
                            className="tableCellGS tableBodyCellGS statCellGS" 
                            key={`playerStatCell${iPlayerStat}-${iStat}`}
                            onClick={()=>user && setModalContent(<EditPlayerStatModel playerStat={playerStat} />)}
                          >{playerStat[stat]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
     </div>)}
    </>
  );
}