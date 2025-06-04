import { createContext, useContext, useState } from "react";
import { apiFetch } from "./fetches";

const TeamContext = createContext()

export function TeamProvider({children}) {
    const teamState = 'team';
    const [team, setTeam] = useState(null);
    const teamsState = 'teams';
    const [teams, setTeams] = useState(null);
    const teamsListState = 'teamsList';
    const [teamsList, setTeamsList] = useState(null);
    

    function allTeams(params) {
        const { setIsLoaded, setMessage } = params;
        apiFetch('api/teams', {}, teamsState, setTeams, setIsLoaded, setMessage)
    }

    function allTeamsList(params) {
        const { setIsLoaded, setMessage } = params;
        apiFetch('api/teams/list', {}, teamsListState, setTeamsList, setIsLoaded, setMessage)
    }

    function teamById(params) {
        const { teamId, setIsLoaded, setMessage } = params;
        apiFetch(`api/team/${teamId}`, {}, teamState, setTeam, setIsLoaded, setMessage)
    }

    function newTeam(params) {
        const { name, setIsLoaded, setMessage } = params;
        apiFetch('api/teams', {
            method: 'POST',
            body: JSON.stringify({name})
        }, teamsState, setTeams, setIsLoaded, setMessage)
    }

    function editTeam(params) {
        const { teamId, name, setIsLoaded, setMessage } = params;
        apiFetch(`api/team/${teamId}`, {
            method: 'PUT',
            body: JSON.stringify({name})
        }, teamsState, setTeams, setIsLoaded, setMessage)
    }

    function deleteTeam(params) {
        const { teamId, setIsLoaded, setMessage } = params;
        apiFetch(`api/team/${teamId}`, {method: 'DELETE'}, teamsState, setTeams, setIsLoaded, setMessage)
    }

    function newPlayer(params) {
        const { teamId, firstName, lastName, number, setIsLoaded, setMessage } = params;
        apiFetch(`api/teams/${teamId}/players`, {
            method: 'POST',
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                number
            })
        }, teamState, setTeam, setIsLoaded, setMessage)
    }

    function editPlayer(params) {
        const { teamId, playerId, firstName, lastName, number, setIsLoaded, setMessage } = params;
        apiFetch(`api/teams/${teamId}/players/${playerId}`, {
            method: 'PUT',
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                number
            })
        }, teamState, setTeam, setIsLoaded, setMessage)
    }

    function deletePlayer(params) {
        const { teamId, playerId, setIsLoaded, setMessage } = params;
        apiFetch(`api/teams/${teamId}/players/${playerId}`, {method: 'DELETE'}, teamState, setTeam, setIsLoaded, setMessage)
    }

    return (
        <TeamContext.Provider value={{team, teams, teamsList, allTeams, allTeamsList, teamById, newTeam, editTeam, deleteTeam, newPlayer, editPlayer, deletePlayer}}>
            {children}
        </TeamContext.Provider>
    )
}

export const useTeam = () => useContext(TeamContext);