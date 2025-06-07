import { useDispatch, } from "react-redux"
import { useModal } from "../../context/Modal";
import "./GamePage.css";
import { useState } from "react";


const RemoveTeamModel = ({gameId, team}) => {
    const {closeModal} = useModal();
    const [message, setMessage] = useState(null);

    const handleDelete = async () => {
        closeModal()
    }
    
    return (
        <div className="formCon">
            <h3 className="confirmText">{`Are you sure you want to remove ${team.name}?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="submitButton yes">Yes</button>
                <button onClick={closeModal} className="submitButton no">No</button>
            </div>
            {message?.errors.message && <p className='labelTitle error'>{errors.message}</p>}
        </div>
    )
}

export default RemoveTeamModel