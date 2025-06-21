import { createContext, useContext, useState } from "react";
import { apiFetch } from "./fetches";

const GameDayContext = createContext()

export function GameDayProvider({children}) {
    const gameDayState = 'gameDay';
    const [gameDay, setGameDay] = useState(null);
    const gameDaysState = 'gameDays';
    const [gameDays, setGameDays] = useState(null);
    const gameDaysListState = 'gameDaysList';
    const [gameDaysList, setGameDaysList] = useState(null);
    const gamesListState = 'gamesList';
    const [gamesList, setGamesList] = useState(null);
    

    async function allGameDays(params) {
        const { setIsLoaded, setMessage } = params;
        return await apiFetch(`/api/game-days`, {}, gameDaysState, setGameDays, setIsLoaded, setMessage)
    }

    async function allGameDaysList(params) {
        const { setIsLoaded, setMessage } = params;
        return await apiFetch(`/api/game-days/list`, {}, gameDaysListState, setGameDaysList, setIsLoaded, setMessage)
    }

    async function gameDayById(params) {
        const { gameDayId, setIsLoaded, setMessage } = params;
        return await apiFetch(`/api/game-days/${gameDayId}`, {}, gameDayState, setGameDay, setIsLoaded, setMessage)
    }

    async function newGameDay(params) {
        const { name, location, date, startTime, endTime, setIsLoaded, setMessage } = params;
        return await apiFetch(`/api/game-days`, {
            method: 'POST',
            body: JSON.stringify({
                name,
                location,
                date,
                start_time: startTime,
                end_time: endTime
            })
        }, gameDaysState, setGameDays, setIsLoaded, setMessage)
    }

    async function editGameDay(params) {
        const { gameDayId, name, location, date, startTime, endTime, setIsLoaded, setMessage } = params;
        return await apiFetch(`/api/game-days/${gameDayId}`, {
            method: 'PUT',
            body: JSON.stringify({
                name,
                location,
                date,
                start_time: startTime,
                end_time: endTime
            })
        }, gameDaysState, setGameDays, setIsLoaded, setMessage)
    }

    async function deleteGameDay(params) {
        const { gameDayId, setIsLoaded, setMessage } = params;
        return await apiFetch(`/api/game-days/${gameDayId}`, {method: 'DELETE'}, gameDaysState, setGameDays, setIsLoaded, setMessage)
    }

    async function allGamesList(params) {
        const { gameDayId, setIsLoaded, setMessage } = params;
        return await apiFetch(`/api/game-days/${gameDayId}/games/list`, {}, gamesListState, setGamesList, setIsLoaded, setMessage)
    }

    async function newGame(params) {
        const { gameDayId, name, division, startTime, endTime, setIsLoaded, setMessage } = params;
        return await apiFetch(`/api/game-days/${gameDayId}/games`, {
            method: 'POST',
            body: JSON.stringify({
                name, 
                division,
                start_time: startTime,
                end_time: endTime
            })
        }, gameDayState, setGameDay, setIsLoaded, setMessage)
    }

    async function editGame(params) {
        const { gameDayId, gameId, name, division, startTime, endTime, setIsLoaded, setMessage } = params;
        return await apiFetch(`/api/game-days/${gameDayId}/games/${gameId}`, {
            method: 'PUT',
            body: JSON.stringify({
                name, 
                division,
                start_time: startTime,
                end_time: endTime
            })
        }, gameDayState, setGameDay, setIsLoaded, setMessage)
    }

    async function deleteGame(params) {
        const { gameDayId, gameId, setIsLoaded, setMessage } = params;
        return await apiFetch(`/api/game-days/${gameDayId}/games/${gameId}`, {method: 'DELETE'}, gameDayState, setGameDay, setIsLoaded, setMessage)
    }

    return (
        <GameDayContext.Provider value={{gameDay, gameDays, gameDaysList, gamesList, allGameDays, allGameDaysList, gameDayById, newGameDay, editGameDay, deleteGameDay, allGamesList, newGame, editGame, deleteGame}}>
            {children}
        </GameDayContext.Provider>
    )
}

export const useGameDay = () => useContext(GameDayContext);