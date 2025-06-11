import { useDispatch, } from "react-redux"
import { useModal } from "../../context/Modal";
import "./GameDayPage.css";
import { useState } from "react";


const DeleteGameModel = ({game}) => {
    const { deleteGame } = useGameDay();
    const {closeModal} = useModal();
    const [message, setMessage] = useState(null);

    const handleDelete = async () => {
        deleteGame({gameDayId: game.game_day_id, gameId: game.id, setMessage})
        .then((res) => {if (res) closeModal();})
        .catch((err)=>setMessage({errors: {message: 'Error with request'}}));
    }
    
    return (
        <div className="formCon">
            <h3 className="confirmText">{`Are you sure you want to delete ${game.name}?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="submitButton yes">Yes</button>
                <button onClick={closeModal} className="submitButton no">No</button>
            </div>
            {message?.errors.message && <p className='labelTitle error'>{message?.errors.message}</p>}
        </div>
    )
}

export default DeleteGameModel