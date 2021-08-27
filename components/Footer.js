import styles from '../styles/Footer.module.scss'
import { useEffect, useState } from 'react';

export default function Options(){
    const initialTimer = 90;
    const [timer, setTimer] = useState(initialTimer);
  
    useEffect(() => {
      if(timer > 0) {
        setTimeout(() => setTimer(timer - 1), 1000);
      }
    }, [timer]);
    return (
      <footer className={styles.timer}>
        <div className={styles.bartimercontainer}>
          <div className={styles.bartimer} style={{ width: `${100*(timer - 1)/initialTimer}%` }}></div>
        </div>
        <h3>{Math.floor(timer/60) < 10 ? "0": ""}{Math.floor(timer/60)}:{timer%60 < 10 ? "0": ""}{timer%60}</h3>
      </footer>
  )
}