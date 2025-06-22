import "./GameStatsPage.css";

export default function SportsVisioModel() {
  let url = import.meta.env.MODE === "production" ? '/disk':''
  const sv_link = "https://www.sportsvisio.com/download?utm_source=sportsvisio.beehiiv.com&utm_medium=newsletter&utm_campaign=welcome-to-the-league_name-your-game-just-got-smarter-with-sportsvisio";
  return (
    <div id="mainConSV" className="fadein">
      <img id="logoSV" src={`${url}/imgs/logo-main.png`} alt="" />
      <p id="infoSV">Download the <a id="linkSV" href={sv_link} target="_blank" rel="noreferrer">SportsVisio</a> App to watch your highlight reels, get your stats, and prep for the championship!</p>
      <a id="linkSponV" href={sv_link} target="_blank" rel="noreferrer">
        <img id="sponserSV" src={`${url}/imgs/sponsors/sports-visio-white.png`} alt="Sports Visio Logo" />
      </a>
    </div>
  );
}