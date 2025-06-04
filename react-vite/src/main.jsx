import React from "react";
import ReactDOM from "react-dom/client";
// import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import configureStore from "./redux/store";
import { router } from "./router";
import "./index.css";
import { UserProvider } from "./context/User";

const store = configureStore();

// if (import.meta.env.MODE !== "production") {
//   window.store = store;
  
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ReduxProvider store={store}> */}
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
    {/* </ReduxProvider> */}
  </React.StrictMode>
);
