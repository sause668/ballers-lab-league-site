import "./HomePage.css";

export default function HomePage() {

  return (
    <div id="mainConHM" className="fadein">
     <div id="logoConHM">
      <img id="logoHM" src="imgs/logo-main.png" alt="" />
     </div>
     <div id="titleConHM">
      <h1 id="t1HP" className="titleHM">Season 4</h1>
      <h1 id="t2HP" className="titleHM">June 1st - July 27th</h1>
      <h1 id="t3HP" className="titleHM">2025</h1>
     </div>
     {/* <div id="videoConHM">
      <video id="videoHM" width="320" height="240" autoPlay loop muted>
        <source src="videos/home-video.mp4" type="video/mp4"/>
        Video Not Available
      </video>
     </div> */}
    </div>
  );
}