import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./GameStatsPage.css";
import { useGame } from "../../context/Game";
import { useUser } from "../../context/User";
import { useModal } from "../../context/Modal";
import EditTeamStatModel from "./EditTeamStatModel";
import EditPlayerStatModel from "./EditPlayerStatModel";
import SportsVisioModel from "./SportsVisioModel";

export default function GameStatsPage() {
  const { setModalContent } = useModal();
  const { gameId } = useParams();
  const { user } = useUser();
  const {gameStats, gameByIdStats, importStats } = useGame();
  const teamStats = [
    gameStats && gameStats?.team_stats[0],
    gameStats && gameStats?.team_stats[1]
  ];
  const playerStats = [
    teamStats[0] && gameStats.player_stats.filter(playerStat => playerStat.player.team_id == teamStats[0].team.id),
    teamStats[1] && gameStats.player_stats.filter(playerStat => playerStat.player.team_id == teamStats[1].team.id)
  ];

  const [isLoaded, setIsLoaded] = useState(false);
  const [statsChecked, setStatsChecked] = useState(gameStats?.stats_imported);
  const [statsStatus, setStatsStatus] = useState('');
  const [message, setMessage] = useState(null);

  if (import.meta.env.MODE !== "production") {
    if (message) console.log(message);
    console.log('User', user);
    console.log('GameStats', gameStats);
  }

  const tableHeaders = ['PPG', 'RPG', 'APG'];
  const tableBody = ['points', 'rebounds', 'assists'];

  function handleImport() {
    importStats({gameId, setMessage})
      .then((res) => {
        if (!res) setStatsStatus('');
        else setStatsStatus('Stats not Ready');
      });
  }
  
  useEffect(() => {
    if (!isLoaded) gameByIdStats({gameId, setIsLoaded, setMessage});
    else {
      if (!gameStats?.stats_imported) {
        if (user && !statsChecked) {
          importStats({gameId, setMessage})
            .then((res) => { if (!res) setStatsStatus('Stats not Ready');});
          setStatsChecked(true);
        } else setStatsStatus('Stats not Ready');
      }
      
    }
  }, [gameByIdStats, importStats, gameId, user, isLoaded, setIsLoaded, setMessage, statsChecked, setStatsChecked, setStatsStatus, gameStats?.stats_imported]);

  return (
    <>
     {isLoaded && (<div id="mainConGS" className="fadein">
      {/* Team Stats */}
      <div id="teamStatsConGS">
        <div id="teamStatsSubConGS" >
          {teamStats.map((teamStat, index) => teamStat && 
            <div 
            className={`teamStatConGS ${index == 0 && 'homeG'}`} 
            key={`teamStatsGS${index}`}
            onClick={()=>user && setModalContent(<EditTeamStatModel teamStat={teamStat} />)}
            >
              <div className="teamInfoConGS">
                <h2 className="teamNameGS">{teamStat.team.name}</h2>
                <h4 className="teamRecordGS">{teamStat.team.record}</h4>
              </div>
              <h1 
                className={`teamPointsGS ${teamStat.win && 'winningTeamGS'}`}
              >{teamStat.points}</h1>
            </div>
          )}
        </div>
      </div>
      
      {/* Player Stats */}
      <div id='playerStatsConGS'>
        {playerStats.map((playerTeamStats, iPlayerTeamStats) => {
          if (playerTeamStats) return(
            <div className="playerStatConGS" key={`playerTeamStatsGS${iPlayerTeamStats}`}>
              <h2 className="playerTeamNameGS">{teamStats[iPlayerTeamStats].team.name}</h2>
              {/* Table */}
              <div className="tableConGS">
                <table className="tableGS">
                  <thead className="tableHeadGS">
                    <tr className="tableHeadRowGS">
                        <td className="tableCellGS tableHeadCellGS" colSpan="2">Players</td>
                      {tableHeaders.map((header, iHeader) => (
                        <td className="tableCellGS tableHeadCellGS tableHeadStatCellGS" key={`tableHeadGS${iHeader}`}>{header}</td>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="tableBodyGS">
                    {playerTeamStats.map((playerStat, iPlayerStat) => (
                      <tr className="tableBodyRowGS" key={`playerStatRow${iPlayerStat}`}>
                        <td className="tableCellGS tableBodyCellGS playerNumberCellGS">{playerStat.player.number}</td>
                        <td 
                          className="tableCellGS tableBodyCellGS playerInfoCellGS"
                          onClick={()=>user && setModalContent(<SportsVisioModel />)}
                        >
                          <h6 className="playerNameGS">{playerStat.player.first_name} {playerStat.player.last_name}</h6>
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
      {statsStatus &&
        <h3 id="statsStatusGS">{statsStatus}</h3>
      }
      {user && 
        <button id="importBtn" onClick={handleImport}>Import Stats</button>
      }
     </div>)}
    </>
  );
}