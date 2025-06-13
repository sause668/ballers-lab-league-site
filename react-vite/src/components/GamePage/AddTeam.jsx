import { useState } from "react";
import { useModal } from "../../context/Modal";
import "./GamePage.css";
import { useTeam } from "../../context/Team";
import { useGame } from "../../context/Game";
import { useEffect } from "react";

function AddTeamModel({gameId}) {
  const { addTeam} = useGame();
  const { teamsList, allTeamsList } = useTeam();
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState(null);
  const [teamId, setTeamId] = useState(teamsList ? teamsList[0]?.id:'');
  const { closeModal } = useModal();

  console.log('TeamsList', teamsList)

  const handleSubmit = async (e) => {
    e.preventDefault();
    addTeam({gameId, teamId, setMessage})
    .then((res) => {if (res) closeModal();})
    .catch(()=>setMessage({errors: {message: 'Error with request'}}));
  };

  useEffect(() => {
    if (!isLoaded) allTeamsList({setIsLoaded, setMessage})
    .catch(()=>setMessage({errors: {message: 'Error with request'}}));
  }, [allTeamsList, isLoaded, setIsLoaded, setMessage]);



  return (
    <>
        {isLoaded && (
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
                        {teamsList && teamsList.map((team, index) => (
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