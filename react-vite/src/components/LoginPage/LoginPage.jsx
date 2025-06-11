import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useUser } from "../../context/User";

export default function LoginPage() {
  const { login } = useUser();
  const nav = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({username, password, setMessage}).then((res) => {if (res) nav('/')});
  };
  
  useEffect(() => {
  }, [setIsLoaded, setMessage]);

  return (
    <div className='formCon'>
        <h1 className='inputTitle'>Login</h1>
        <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className='inputCon'>
          <label htmlFor='Username'>
            <p className='labelTitle'>
              Username
            </p>
          </label>
          <input
            className='formInput'
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {message?.errors.username && <p className='labelTitle error'>{message.errors.username}</p>}
        </div>
        {/* password */}
        <div className='inputCon'>
          <label htmlFor='password'>
            <p className='labelTitle'>
              Password
            </p>
          </label>
          <input
            className='formInput'
            id="password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {message?.errors.password && <p className='labelTitle error'>{message.errors.password}</p>}
        </div>
        <div className="submitCon">
            <button 
                className='submitButton'
                type="submit"
                disabled={
                  (!username?.length) ||
                  (!password?.length) 
                }
            >Submit</button>
        </div>
        {message?.errors.message && <p className='labelTitle error'>{message.errors.message}</p>}
        </form>
    </div>
  );
}