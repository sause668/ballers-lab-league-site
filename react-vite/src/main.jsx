import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";
import { UserProvider } from "./context/User";
import { GameDayProvider } from "./context/GameDay";
import { GameProvider } from "./context/Game";
import { TeamProvider } from "./context/Team";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <TeamProvider>
        <GameDayProvider>
          <GameProvider>
            <RouterProvider router={router} />
          </GameProvider>
        </GameDayProvider>
      </TeamProvider>
    </UserProvider>
  </React.StrictMode>
);
