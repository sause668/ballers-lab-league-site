import "./HomePage.css";

export default function HomePage() {

  return (
    <div id="mainConHM">
     <div id="logoConHM">
      <img id="logoHM" width="320" height="240" src="imgs/logo-main.png" alt="" />
     </div>
     <div id="titleConHM">
      <h1 className="titleHM">Season 4</h1>
      <h1 className="titleHM">June 1st - July 27th</h1>
      <h1 className="titleHM">2025</h1>
     </div>
     <div id="videoConHM">
      <video id="videoHM" width="320" height="240" autoPlay loop muted>
        <source src="videos/home-video.mp4" type="video/mp4"/>
        Video Not Available
      </video>
     </div>
    </div>
  );
}