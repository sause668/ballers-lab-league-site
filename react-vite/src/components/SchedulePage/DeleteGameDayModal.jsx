import { useModal } from "../../context/Modal";
import "./SchedulePage.css";
import { useState } from "react";
import { useGameDay } from "../../context/GameDay";


const DeleteGameDayModel = ({gameDay}) => {
    const { deleteGameDay } = useGameDay();
    const {closeModal} = useModal();
    const [message, setMessage] = useState(null);

    const handleDelete = async (e) => {
        e.preventDefault();
        deleteGameDay({gameDayId: gameDay.id, setMessage})
        .then((res) => {if (res) closeModal();})
        .catch(()=>setMessage({errors: {message: 'Error with request'}}));
      };
    
    return (
        <div className="formCon">
            <h3 className="confirmText">{`Are you sure you want to delete ${gameDay.name}?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="submitButton yes">Yes</button>
                <button onClick={closeModal} className="submitButton no">No</button>
            </div>
            {message?.errors.message && <p className='labelTitle error'>{message?.errors.message}</p>}
        </div>
    )
}

export default DeleteGameDayModel