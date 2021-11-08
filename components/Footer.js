import styles from "../styles/Footer.module.scss";
import { useContext, useEffect, useState } from "react";
import { socketContext } from "../context/socket";

export default function Options({ room, checked }) {
  const [ initialTimer, setInitialTimer ] = useState(null);
  const [ timer, setTimer ] = useState(null);

  const { socket } = useContext(socketContext);
  
  useEffect(() => {
    if(socket) {
      socket.on("initialTimer", (initialTimer) => {
        setInitialTimer(initialTimer);
      })

      socket.on("timer", (curtime) => {
        setTimer(curtime);
      })
    }
  }, [socket]);

  if(!initialTimer || !timer) {
    return <h1>Carregando...</h1>
  }

  return (
    <footer className={styles.timer}>
      <div className={styles.bartimercontainer}>
        <div
          className={styles.bartimer}
          style={{ width: `${(100 * (timer - 1)) / initialTimer}%` }}
        ></div>
      </div>
      <h3>
        {Math.floor(timer / 60) < 10 ? "0" : ""}
        {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
        {timer % 60}
      </h3>
    </footer>
  );
}
