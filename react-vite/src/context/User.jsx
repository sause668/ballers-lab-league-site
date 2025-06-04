import { createContext, useContext, useState } from "react";
import { apiFetch } from "./fetches";

const UserContext = createContext()

export function UserProvider({children}) {
    const userState = 'user';
    const [user, setUser] = useState(null);
    

    function restoreUser(params) {
        const { setIsLoaded, setMessage } = params;
        apiFetch('api/session', {}, userState, setUser, setIsLoaded, setMessage)
    }

    function login(params) {
        const { username, password, setIsLoaded, setMessage } = params;
        apiFetch('api/session', {
            method: 'POST',
            body: JSON.stringify({username, password})
        }, userState, setUser, setIsLoaded, setMessage)
    }

    function logout(params) {
        const { setIsLoaded, setMessage } = params;
        apiFetch('api/session', {method: 'DELETE'}, userState, setUser, setIsLoaded, setMessage)
    }

    

    

    return (
        <UserContext.Provider value={{user, restoreUser, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);