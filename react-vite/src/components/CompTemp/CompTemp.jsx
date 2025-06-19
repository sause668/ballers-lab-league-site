import { useEffect, useState } from "react";
import "./CompTemp.css";

export default function CompTemp() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState(null);
  
  useEffect(() => {
  }, [setIsLoaded, setMessage]);

  return (
    <>
     {isLoaded && <></>}
    </>
  );
}