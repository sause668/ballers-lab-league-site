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
    

    function allGameDays(params) {
        const { setIsLoaded, setMessage } = params;
        apiFetch(`api/game-days`, {}, gameDaysState, setGameDays, setIsLoaded, setMessage)
    }

    function allGameDaysList(params) {
        const { setIsLoaded, setMessage } = params;
        apiFetch(`api/game-days/list`, {}, gameDaysListState, setGameDaysList, setIsLoaded, setMessage)
    }

    function gameDayById(params) {
        const { gameDayId, setIsLoaded, setMessage } = params;
        apiFetch(`api/game-days/${gameDayId}`, {}, gameDayState, setGameDay, setIsLoaded, setMessage)
    }

    function newGameDay(params) {
        const { name, location, date, startTime, endTime, setIsLoaded, setMessage } = params;
        apiFetch(`api/game-days`, {
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

    function editGameDay(params) {
        const { gameDayId, name, location, date, startTime, endTime, setIsLoaded, setMessage } = params;
        apiFetch(`api/game-days/${gameDayId}`, {
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

    function deleteGameDay(params) {
        const { gameDayId, setIsLoaded, setMessage } = params;
        apiFetch(`api/game-days/${gameDayId}`, {method: 'DELETE'}, gameDaysState, setGameDays, setIsLoaded, setMessage)
    }

    function allGamesList(params) {
        const { gameDayId, setIsLoaded, setMessage } = params;
        apiFetch(`api/game-days/${gameDayId}`, {}, gamesListState, setGamesList, setIsLoaded, setMessage)
    }

    function newGame(params) {
        const { gameDayId, name, startTime, endTime, setIsLoaded, setMessage } = params;
        apiFetch(`api/game-days/${gameDayId}/games/list`, {
            method: 'POST',
            body: JSON.stringify({
                name, 
                start_time: startTime,
                end_time: endTime
            })
        }, gameDayState, setGameDay, setIsLoaded, setMessage)
    }

    function editGame(params) {
        const { gameDayId, gameId, name, startTime, endTime, setIsLoaded, setMessage } = params;
        apiFetch(`api/game-days/${gameDayId}/games/${gameId}`, {
            method: 'POST',
            body: JSON.stringify({
                name, 
                start_time: startTime,
                end_time: endTime
            })
        }, gameDayState, setGameDay, setIsLoaded, setMessage)
    }

    function deleteGame(params) {
        const { gameDayId, gameId, setIsLoaded, setMessage } = params;
        apiFetch(`api/game-days/${gameDayId}/games/${gameId}`, {method: 'DELETE'}, gameDayState, setGameDay, setIsLoaded, setMessage)
    }

    return (
        <GameDayContext.Provider value={{gameDay, gameDays, gameDaysList, gamesList, allGameDays, allGameDaysList, gameDayById, newGameDay, editGameDay, deleteGameDay, allGamesList, newGame, editGame, deleteGame}}>
            {children}
        </GameDayContext.Provider>
    )
}

export const useGameDay = () => useContext(GameDayContext);