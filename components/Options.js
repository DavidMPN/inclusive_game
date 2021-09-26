import styles from "../styles/Options.module.scss";
import { useContext, useEffect, useState } from "react";
import { socketContext } from "../context/socket";
import useSound from 'use-sound';

export default function Options({ texts, room }) {
  const [checkedOption, setCheckedOption] = useState("");
  const [right, setRight]                 = useState(null);
  const [ timer, setTimer ]               = useState(null);

  const [ playRight ] = useSound('/acertou.mp3', { volume: 0.4 });
  const [ playWrong ] = useSound('/errou.mp3', { volume: 0.4 });

  const { socket } = useContext(socketContext);
  
  useEffect(() => {
    if(socket) {
      socket.on("timer", (curtime) => {
        setTimer(curtime);
      })

      socket.on("right", () => {
        setRight(true);
        playRight();
      });

      socket.on("wrong", () => {
        setRight(false);
        playWrong();
      });
    }
  }, [socket]);

  useEffect(() => {
    if(socket) {
      if(playRight && playWrong) {
        socket.on("right", () => {
          playRight();
        });
  
        socket.on("wrong", () => {
          playWrong();
        });
      }
    }
  }, [playRight, playWrong]);

  useEffect(() => {
    if(socket && timer == 0) {
      socket.emit("response", { response: checkedOption, roomname: room });
    }

    if(timer > 0) {
      setRight(null);
    }
  }, [timer, socket]);

  return (
    <form className={styles.options}>
      <button onClick={playRight}></button>
      <label
        className={`${styles.option} ${checkedOption == "A" && styles.active} ${right != null && checkedOption == "A" && timer == 0 && (right ? styles.right : styles.wrong)}`}
        title="Opção A"
      >
        <span>A</span>
        <input
          checked={checkedOption == "A"}
          onChange={() => {
            if(right == null) setCheckedOption("A");
          }}
          type="radio"
          name="option"
        />
        {texts[0]}
      </label>
      <label
        className={`${styles.option} ${checkedOption == "B" && styles.active} ${right != null && checkedOption == "B" && timer == 0 && (right ? styles.right : styles.wrong)}`}
        title="Opção B"
      >
        <span>B</span>
        <input
          checked={checkedOption == "B"}
          onChange={() => {
            if(right == null) setCheckedOption("B");
          }}
          type="radio"
          name="option"
        />
        {texts[1]}
      </label>
      <label
        className={`${styles.option} ${checkedOption == "C" && styles.active} ${right != null && checkedOption == "C" && timer == 0 && (right ? styles.right : styles.wrong)}`}
        title="Opção C"
      >
        <span>C</span>
        <input
          checked={checkedOption == "C"}
          onChange={() => {
            if(right == null) setCheckedOption("C");
          }}
          type="radio"
          name="option"
        />
        {texts[2]}
      </label>
      <label
        className={`${styles.option} ${checkedOption == "D" && styles.active} ${right != null && checkedOption == "D" && timer == 0 && (right ? styles.right : styles.wrong)}`}
        title="Opção D"
      >
        <span>D</span>
        <input
          checked={checkedOption == "D"}
          onChange={() => {
            if(right == null) setCheckedOption("D");
          }}
          type="radio"
          name="option"
        />
        {texts[3]}
      </label>
    </form>
  );
}
