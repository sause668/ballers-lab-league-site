import { useParams } from "react-router-dom";
import { seasonPhotos } from "../../utils/photos";
import "./SeasonPhotosPage.css";

export default function SeasonPhotosPage() {
  const { seasonId } = useParams();
  const season = seasonPhotos[seasonId-1];

  return (
    <div id="mainConSP" className="fadein">
      {season?.photos.map((pic, index) => (
        <div className="imgConCP" key={`season${season.season}photo${index}`}>
          <img className="imgCP" src={pic} alt={`Season ${season.season} Photo ${index+1}`} width={500}/>
        </div>
      ))}
    </div>
  );
}