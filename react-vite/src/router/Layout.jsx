import { useEffect, useState } from "react";
import { Outlet} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";

export default function Layout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkAuthenticate())
      .then(() => setIsLoaded(true))
      .catch(error => console.log(error));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <Outlet />
        <Modal />
      </ModalProvider>
    </>
  );
}
