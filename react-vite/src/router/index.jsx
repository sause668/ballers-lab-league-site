import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (<>HomePage</>),
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
            element: 'SchedulePage',
          },
          {
            path: ":gameDayId/",
            children: [
              {
                path: "",
                element: 'GameDayPage',
              },
              {
                path: ":gameId/",
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
    ],
  },
]);