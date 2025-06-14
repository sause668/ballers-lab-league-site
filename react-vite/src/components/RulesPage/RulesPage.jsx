import "./RulesPage.css";

export default function RulesPage() {
  return (
    <div id="mainConRU">
      <h1 id="titleRU">RULES & Regulations</h1>
      <h2 className="titleSubRU">Game Format</h2>
      <ul className="listConRU">
        <li className="listInfoRU">4 quarters</li>
        <ul className="listSubConRU">
          <li className="listSubInfoRU">10 minutes each</li>
        </ul>
        <li className="listInfoRU">Running clock until final 2 minutes of 4th quarter</li>
        <li className="listInfoRU">2 timeouts per half (4 total)</li>
        <li className="listInfoRU">6 fouls = foul out</li>
        <li className="listInfoRU">Ball advancement during 4th quarter and/or OT with 59.9 seconds left.</li>
      </ul>
      <br className="dividerRU" />
      <h2 className="titleSubRU">Timing</h2>
      <ul className="listConRU">
        <li className="listInfoRU">Warmup: 7 minutes</li>
        <li className="listInfoRU">Halftime: 5 minutes</li>
      </ul>
      <br className="dividerRU" />
      <h2 className="titleSubRU">Gameplay</h2>
      <ul className="listConRU">
        <li className="listInfoRU">5v5 | Backcourt violation applies</li>
        <li className="listInfoRU">1 free throw = 2 points</li>
        <li className="listInfoRU">3-pointer foul = 1 free throw attempt valued at 3 points </li>
        <li className="listInfoRU">And-1 foul = 2 points and 1 free throw attempt; 3 points total </li>
        <li className="listInfoRU">5 team fouls = Bonus (per quarter)</li>
        <ul className="listSubConRU">
          <li className="listSubInfoRU">Fouls reset per quarter</li>
          <li className="listSubInfoRU">Only defensive AND loose ball fouls count</li>
        </ul>
        <li className="listInfoRU">10 team fouls= Double Bonus (per quarter)</li>
        <ul className="listSubConRU">
          <li className="listSubInfoRU">Fouls reset per quarter</li>
          <li className="listSubInfoRU">Only defensive AND loose ball fouls count</li>
        </ul>
        <li className="listInfoRU">1 Technical: 1 free throw (2pts) + possession</li>
        <li className="listInfoRU">2 Technicals: Ejection</li>
      </ul>
      <br className="dividerRU" />
      <h2 className="titleSubRU">Overtime</h2>
      <ul className="listConRU">
        <li className="listInfoRU">1st OT: 1 minute | 1 timeout per team</li>
        <li className="listInfoRU">2nd OT: First team to score wins</li>
      </ul>
      <br className="dividerRU" />
      <h2 className="titleSubRU">Zero Tolerance</h2>
      <ul className="listConRU">
        <li className="listInfoRU">Fighting = League suspension (no refund)</li>
      </ul>
      <br className="dividerRU" />
      <h2 className="titleSubRU">All teams make playoffs</h2>
    </div>
  );
}