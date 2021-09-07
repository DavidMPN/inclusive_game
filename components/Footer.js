import styles from "../styles/Footer.module.scss";
import { useEffect, useState } from "react";

export default function Options({ curTime, time }) {
  const initialTimer = time;
  // const timer = curTime;
  const [timer, setTimer] = useState(curTime);
  console.log("curTime do cliente:", curTime);
  useEffect(() => {
    // if (timer > 0) {
    //   setTimeout(() => setTimer(timer - 1), 1000);
    //   console.log("timer do cliente:", timer);
    // } else {
    //   if (curTime > 0) {
    //     setTimer(curTime);
    //   }
    // }
    if (timer == 0) {
      if (curTime > time - 5) {
        setTimer(curTime);
      }
    } else if (curTime > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
      if (curTime < timer) {
        setTimer(curTime);
      } else {
        setTimer(timer);
      }
    } else setTimer(0);
  }, [curTime, time, timer]);
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
