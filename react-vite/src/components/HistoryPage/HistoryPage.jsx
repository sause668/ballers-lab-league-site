import "./HistoryPage.css";

export default function HistoryPage() {
  let url = import.meta.env.MODE === "production" ? '/disk':''
   
  return (
    <div id="mainConHI">
      <div id="imageConHI">
        <img id="imageHI" src={`${url}/imgs/history-main.jpg`} alt="" />
      </div>
      <div id="infoConHI">
        <h1 id="titleHI">OUR MISSION</h1>
        <p className="infoHI">
          At Ballers Lab League, our mission is to empower women through 
          the transformative power of basketball while fostering a vibrant 
          community in Miami. We are dedicated to giving back to the 
          women&apos;s basketball community by creating a platform that 
          celebrates both seasoned players and passionate newcomers. 
          Beyond basketball, we are committed to supporting women 
          entrepreneurs by providing a unique opportunity for our players 
          to showcase their business profiles and connect with like-minded 
          individuals. 
        </p>
        <p className="infoHI">
          Our league is more than just a game; it&apos;s a community built on 
          strength, resilience, and collaboration. Together, we strive 
          to uplift, inspire, and empower women both on and off the court. 
          Join us in creating a legacy of excellence, camaraderie, and 
          entrepreneurship in Miami.
        </p>
      </div>
    </div>
  );
}