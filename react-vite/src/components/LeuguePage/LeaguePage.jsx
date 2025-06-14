import "./LeaguePage.css";

export default function LeaguePage() {
  const imgScale = 8

  return (
    <div id='mainConLE' className="fadein">
      <div id="titleConLE">
        <h1 id="titleLE">Adult Women&apos;s League</h1>
      </div>
      {/* <div id="borderLE"/> */}
      <div id="pageBodyConLE">
        <div id="imgConLE">
          <img id="imgLE" className="grayscale"  src="/imgs/league-main.jpg" alt="" />
        </div>
        <div id="infoConLE">
          <h4 id="titlePreLE">Our league consist of 2 Divisions :</h4>
          <h3 className="titleSubLE"><u>Hoopers Division:</u></h3>
          <p className="paraLE">
            This division is suited to players looking for an intermediate level of competition. 
            You will see players that are looking to have fun, slower-paced game, and players 
            that generally just love playing the game. 
          </p>
          <h3 className="titleSubLE"><u>Elite Division:</u></h3>
          <p className="paraLE">
            This division is suited to players who wish to be in a more competitive atmosphere and 
            can handle a high level of competition. You will see overseas players, college players, 
            and players that are used to high intensity level of play. 
          </p>
          <p className="paraLE">
            You must be <b><i>evaluated</i></b> and <b><i>approved</i></b> by Ballers Lab League Organization in order to be a 
            part of the Elite Division. 
          </p>
          <h3 id="lastLE" className="titleSubLE"><u>Game Schedule:</u></h3>
          <ul id="listConLE">
            <li className="listInfoLE"><b>Sundays | 1:00-7:00 PM</b></li>
            <li className="listInfoLE"><b><i>Father&apos;s Day Weekend:</i></b> Games will be held <b><i>Saturday, June 14</i></b> (1:00-7:00 PM)</li>
            <li className="listInfoLE"><b><i>Quarterfinals:</i></b> Saturday, July 19 (1:00-7:00 PM)</li>
          </ul>
          {/* <p className="paraLE">
            &#x2022; Sundays | 1:00-7:00 PM<br/>
            &#x2022; Father's Day Weekend: Games will be held Saturday, June 14 (1:00-7:00 PM)<br/>
            &#x2022; Quarterfinals: Saturday, July 19 (1:00-7:00 PM)
          </p> */}
        </div>
      </div>
    </div>
  );
}