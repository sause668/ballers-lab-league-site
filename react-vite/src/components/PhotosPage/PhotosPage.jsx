import "./PhotosPage.css";
import { seasonPhotos } from "../../utils/photos";

export default function PhotosPage() {
  return (
    <div id="mainConPH" className="fadein">
      {seasonPhotos && seasonPhotos.map((season, index) => (
        <div className="imgConPH" key={`seasonMainPhoto${index}`}>
          <a className='imgLinkPH' href={`/photos/${season.season}`}>
            <img className="imgPH" src={season.photoMain} alt={`Season ${season.season} Photos`} />
            <h2 className="imgTitlePH">{`Season ${season.season}`}</h2>
          </a>
        </div>
      ))}
    </div>
  );
}