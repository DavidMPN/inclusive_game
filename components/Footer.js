import styles from "../styles/Footer.module.scss";
import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";

export default function Options({ room, checked }) {
  const { data, error } = useSWR(
    "/api/room/timer",
    async (url) => {
      const response = await axios.post(url, { roomname: room });
      return response.data;
    },
    { refreshInterval: 3000 }
  );

  const initialTimer = data?.time;
  const [ timer, setTimer ] = useState();
  
  useEffect(() => {
    axios.post("/api/room/timer", { roomname: room }).then(response => setTimer(response.data.curTime));
  }, [room]);

  useEffect(() => { 
    if (timer > 0) setTimeout(() => {setTimer(timer - 1)}, 1000);
    else {
      if(data?.response) {
        axios.post("/api/room/timer", { roomname: room, response: checked }).then(res => console.log(res.data));
      }
    }
  }, [checked, data, room, timer]);
  
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
