import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useUser } from "../../context/User";

export default function NavBar() {
  const { logout, user } = useUser();
  const nav = useNavigate();
  const [message, setMessage] = useState(null);
  if (message) console.log(message);

  async function handleLogout() {
    logout({setMessage}).then((res) => {if (res) nav(0)});
  }

  return (
    <>
    {user && <button onClick={handleLogout}>Logout</button>}
    </>
  );
}