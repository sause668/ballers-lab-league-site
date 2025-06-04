import { useEffect, useState } from "react";
import { Outlet} from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
// import { thunkAuthenticate } from "../redux/session";
import { useUser } from "../context/User";

export default function Layout() {
  const {restoreUser} = useUser()
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState(null);
  
  useEffect(() => {
    restoreUser({setIsLoaded, setMessage});
  }, [restoreUser]);

  return (
    <>
      <ModalProvider>
        NavBar
        {isLoaded && <Outlet />}
        <Modal />
        Footer
      </ModalProvider>
    </>
  );
}
