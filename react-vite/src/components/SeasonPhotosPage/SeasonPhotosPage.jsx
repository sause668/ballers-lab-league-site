import { useParams } from "react-router-dom";
import { seasonPhotos } from "../../utils/photos";
import "./SeasonPhotosPage.css";

export default function SeasonPhotosPage() {
  const { seasonId } = useParams();
  const season = seasonPhotos[seasonId-1];
  let url = import.meta.env.MODE === "production" ? '/disk':''

  return (
    <div id="mainConSP" className="fadein">
      {season?.photos.map((pic, index) => (
        <div className="imgConCP" key={`season${season.season}photo${index}`}>
          <img className="imgCP" src={`${url}${pic}`} alt={`Season ${season.season} Photo ${index+1}`} width={500}/>
        </div>
      ))}
    </div>
  );
}