import { useEffect, useState } from "react";
import { Outlet} from "react-router-dom";
import { ModalProvider, Modal } from "../context/Modal";
import { useUser } from "../context/User";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

export default function Layout() {
  const {restoreUser} = useUser()
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState(null);
  if (message) console.log(message); 
  
  useEffect(() => {
    !isLoaded && restoreUser({setIsLoaded, setMessage});
  }, [isLoaded, restoreUser]);

  return (
    <>
      <ModalProvider>
        <NavBar/>
        {isLoaded && <Outlet />}
        <Modal />
        <Footer/>
      </ModalProvider>
    </>
  );
}
