import { useModal } from "../../context/Modal";
import "./GamePage.css";
import { useState } from "react";
import { useGame } from "../../context/Game";


const RemoveTeamModel = ({gameId, team}) => {
    const { removeTeam} = useGame();
    const { closeModal } = useModal();
    const [message, setMessage] = useState(null);

    const handleDelete = async () => {
        removeTeam({gameId, teamId:team.id, setMessage})
        .then((res) => {if (res) closeModal();})
        .catch(()=>setMessage({errors: {message: 'Error with request'}}));
    }
    
    return (
        <div className="formCon">
            <h3 className="confirmText">{`Are you sure you want to remove ${team.name}?`}</h3>
            <div className="confirmButtonCon">
                <button onClick={handleDelete} className="submitButton yes">Yes</button>
                <button onClick={closeModal} className="submitButton no">No</button>
            </div>
            {message?.errors.message && <p className='labelTitle error'>{message?.errors.message}</p>}
        </div>
    )
}

export default RemoveTeamModel