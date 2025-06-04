import { createContext, useContext, useState } from "react";
import { apiFetch } from "./fetches";

const GameContext = createContext()

export function GameProvider({children}) {
    const gameState = 'game';
    const [game, setGame] = useState(null);
    const gameStatsState = 'gameStats';
    const [gameStats, setGameStats] = useState(null);
    

    

    function gameById(params) {
        const { gameId, setIsLoaded, setMessage } = params;
        apiFetch(`api/games/${gameId}`, {}, gameState, setGame, setIsLoaded, setMessage)
    }

    function gameByIdStats(params) {
        const { gameId, setIsLoaded, setMessage } = params;
        apiFetch(`api/games/${gameId}/stats`, {}, gameStatsState, setGameStats, setIsLoaded, setMessage)
    }

    function addTeam(params) {
        const { gameId, teamId, setIsLoaded, setMessage } = params;
        apiFetch(`api/games/${gameId}/teams/${teamId}`, {method: 'POST'}, gameState, setGame, setIsLoaded, setMessage)
    }

    function removeTeam(params) {
        const { gameId, teamId, setIsLoaded, setMessage } = params;
        apiFetch(`api/games/${gameId}/teams/${teamId}`, {method: 'DELETE'}, gameState, setGame, setIsLoaded, setMessage)
    }

    function editTeamStats(params) {
        const { gameId, teamId, win, points, setIsLoaded, setMessage } = params;
        apiFetch(`api/games/${gameId}/teams/${teamId}`, {
            method: 'PUT',
            body: JSON.stringify({win, points})
        }, gameStatsState, setGameStats, setIsLoaded, setMessage)
    }

    function editPlayerStats(params) {
        const { gameId, playerId, points, assists, rebounds, setIsLoaded, setMessage } = params;
        apiFetch(`api/games/${gameId}/players/${playerId}`, {
            method: 'PUT',
            body: JSON.stringify({points, assists, rebounds})
        }, gameStatsState, setGameStats, setIsLoaded, setMessage)
    }
    

    

    return (
        <GameContext.Provider value={{game, gameStats, gameById, gameByIdStats, addTeam, removeTeam, editTeamStats, editPlayerStats}}>
            {children}
        </GameContext.Provider>
    )
}

export const useGame = () => useContext(GameContext);