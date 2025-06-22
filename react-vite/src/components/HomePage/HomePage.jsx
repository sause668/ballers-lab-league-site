import { useEffect } from "react";
import "./HomePage.css";

export default function HomePage() {
  let url = import.meta.env.MODE === "production" ? 'disk/':''

  useEffect(() => {
    document.getElementById('videoHM').play();

  }, []);

  return (
    <div id="mainConHM" className="fadein">
     <div id="logoConHM">
      <img id="logoHM" src={`${url}imgs/logo-main.png`} alt="" />
     </div>
     <div id="titleConHM">
      <h1 id="t1HP" className="titleHM">Season 4</h1>
      <h1 id="t2HP" className="titleHM">June 1st - July 27th</h1>
      <h1 id="t3HP" className="titleHM">2025</h1>
     </div>
     <div id="videoConHM">
      <video id="videoHM" width="320" height="240" autoPlay loop muted>
        <source src={`${url}videos/home-video.mp4`} type="video/mp4"/>
      </video>
     </div>
    </div>
  );
}