import { sponsors } from "../../utils/sponsers";
import { FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import "./Footer.css";

export default function Footer() {
  return (
    <div id="mainConFO">
      <div id="sponsorsConFO">
        {sponsors.map((sponsor, index) => (
          <div className="spLogoConFO " key={`spLogoCon${index}`}>
            <img className="spLogoFO blackout" src={sponsor.img} alt={sponsor.name} width={50}/>
          </div>
        ))}
      </div>
      <div id='socialsConFO'>
          <a className="socialLinkFO" href="">
            <FiInstagram className="socialIconFO"/>
          </a>
          <a className="socialLinkFO" href="">
            <FaXTwitter className="socialIconFO"/>
          </a>
          <a className="socialLinkFO" href="">
            <FaTiktok className="socialIconFO"/>
          </a>
          <a className="socialLinkFO" href="">
            <FaMeta className="socialIconFO"/>
          </a>
      </div>
      <div id="creatorsConFO">
        
      </div>
    </div>
  );
}