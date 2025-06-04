import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import { GameDayProvider } from '../context/GameDay';
import SchedulePage from '../components/SchedulePage/SchedulePage';
import GameDayPage from '../components/GameDayPage/GameDayPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: 'HomePage'
      },
      {
        path: "league/",
        children: [
          {
            path: "",
            element: 'LeaguePage',
          },
          {
            path: "rules",
            element: 'RulesPage',
          },
          {
            path: "history",
            element: 'HistoryPage',
          },
        ]
      },
      {
        path: "schedule/",
        children: [
          {
            path: "",
            element: <GameDayProvider><SchedulePage/></GameDayProvider>,
          },
          {
            path: ":gameDayId/",
            children: [
              {
                path: "",
                element: <GameDayProvider><GameDayPage/></GameDayProvider>,
              },
              {
                path: "games/:gameId/",
                children: [
                  {
                    path: "",
                    element: 'GamePage',
                  },
                  {
                    path: "stats",
                    element: 'GameStatsPage',
                  },
                ]
              },
            ]
          },
        ]
      },
      {
        path: "photos/",
        children: [
          {
            path: "",
            element: 'PhotosPage',
          },{
            path: ":seasonId",
            element: 'SeasonPhotosPage',
          },
        ]
      },
      {
        path: "teams/",
        children: [
          {
            path: "",
            element: 'TeamsPage',
          },{
            path: ":teamId",
            element: 'PlayersPage',
          },
        ]
      },
      {
        path: "admin",
        element: 'LoginPage'
      },
    ],
  },
]);