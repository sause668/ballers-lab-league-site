import { sponsors } from "../../utils/sponsers";
import { FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import "./Footer.css";

export default function Footer() {
  let url = import.meta.env.MODE === "production" ? '/disk':''
  return (
    <div id="mainConFO">
      <h3 id="titleFO">Sponsors & Partners</h3>
      <div id="sponsorsConFO">
        {sponsors.map((sponsor, index) => (
          <div className="spLogoConFO " key={`spLogoCon${index}`}>
            <img className="spLogoFO blackout" src={`${url}${sponsor.img}`} alt={sponsor.name} width={50}/>
          </div>
        ))}
      </div>
      <div id='socialsConFO'>
          <a className="socialLinkFO" href="https://www.instagram.com/ballerslableague/?hl=en" target="_blank" rel="noreferrer">
            <FiInstagram className="socialIconFO"/>
          </a>
          <a className="socialLinkFO" href="https://x.com/Ballerslablg" target="_blank" rel="noreferrer">
            <FaXTwitter className="socialIconFO"/>
          </a>
          <a className="socialLinkFO" href="https://www.tiktok.com/@ballerslableague" target="_blank" rel="noreferrer">
            <FaTiktok className="socialIconFO"/>
          </a>
          <a className="socialLinkFO" href="https://www.facebook.com/p/Ballers-Lab-League-100081294292276/" target="_blank" rel="noreferrer">
            <FaMeta className="socialIconFO"/>
          </a>
      </div>
      <div id="creatorsConFO">
        
      </div>
    </div>
  );
}