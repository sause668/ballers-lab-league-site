import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./GamePage.css";
import { useTeam } from "../../context/Team";

function AddTeamModel({gameId}) {
    const { teamsList, allTeamsList } = useTeam()
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState(null);
    const [teamId, setTeamId] = useState(teamsList[0]?.id);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    allTeamsList({isLoaded, setMessage});
  }, []);



  return (
    <>
        {(isLoaded) && (
            <div className='formCon'>
                <h1 className='inputTitle'>Add Team</h1>
                <form onSubmit={handleSubmit}>
                <div className='inputCon'>
                    <select 
                        name="addTeam" 
                        id="addTeam" 
                        className="formInput"
                        value={teamId} 
                        onChange={(e) => setTeamId(e.target.value)}
                    >
                        {teamsList.map((team, index) => (
                            <option value={team.id} key={`addTeam${index}`}>{team.name}</option>
                        ))}
                    </select>
                </div>
                <div className="submitCon">
                    <button 
                        className='submitButton'
                        type="submit"
                        disabled={(!teamId)}
                    >Submit</button>
                </div>
                {message?.errors.message && <p className='labelTitle error'>{message?.errors.message}</p>}
                </form>
            </div>
        )}
    </>
  );
}

export default AddTeamModel;