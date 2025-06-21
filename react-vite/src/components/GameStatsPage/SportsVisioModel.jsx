import "./GameStatsPage.css";

export default function SportsVisioModel() {
  let url = import.meta.env.MODE === "production" ? '/disk':''

  return (
    <div id="mainConSV" className="fadein">
      <img id="logoSV" src={`${url}/imgs/logo-main.png`} alt="" />
      <p id="infoSV">Download the <a id="linkSV">SportsVisio</a> App to watch your highlight reels, get your stats, and prep for the championship!</p>
      <img id="sponserSV" src={`${url}/imgs/sponsors/sports-visio-white.png`} alt="Sports Visio Logo" />
    </div>
  );
}