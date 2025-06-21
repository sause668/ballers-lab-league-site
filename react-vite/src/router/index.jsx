import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import SchedulePage from '../components/SchedulePage/SchedulePage';
import GameDayPage from '../components/GameDayPage/GameDayPage';
import GamePage from '../components/GamePage/GamePage';
import GameStatsPage from '../components/GameStatsPage/GameStatsPage';
import LoginPage from '../components/LoginPage/LoginPage';
import HomePage from '../components/HomePage/HomePage';
import LeaguePage from '../components/LeuguePage/LeaguePage';
import RulesPage from '../components/RulesPage/RulesPage';
import HistoryPage from '../components/HistoryPage/HistoryPage';
// import PhotosPage from '../components/PhotosPage/PhotosPage';
// import SeasonPhotosPage from '../components/SeasonPhotosPage/SeasonPhotosPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "/admin",
        element: <LoginPage/>
      },
      {
        path: "league/",
        children: [
          {
            path: "",
            element: <LeaguePage/>,
          },
          {
            path: "rules",
            element: <RulesPage/>,
          },
          {
            path: "history",
            element: <HistoryPage/>,
          },
        ]
      },
      {
        path: "schedule/",
        children: [
          {
            path: "",
            element: <SchedulePage/>,
          },
          {
            path: ":gameDayId/",
            children: [
              {
                path: "",
                element: <GameDayPage/>,
              },
              {
                path: "games/:gameId/",
                children: [
                  {
                    path: "",
                    element: <GamePage/>,
                  },
                  {
                    path: "stats",
                    element: <GameStatsPage/>,
                  },
                ]
              },
            ]
          },
        ]
      },
      // {
      //   path: "photos/",
      //   children: [
      //     {
      //       path: "",
      //       element: <PhotosPage/>,
      //     },{
      //       path: ":seasonId",
      //       element: <SeasonPhotosPage/>,
      //     },
      //   ]
      // },
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