import styles from '../styles/Home.module.scss';
import { FiSettings } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function Home({ room }) {
  const initialTimer = 90;

  const [checkedOption, setCheckedOption] = useState("");
  const [timer, setTimer] = useState(initialTimer);

  useEffect(() => {
    if(timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    }
  }, [timer]);

  return (
    <div className={styles.container}>
      <header>
        <h1>4ALL</h1>

        <button><FiSettings size={35} color="#777" /></button>
      </header>

      <main>
        <div className={styles.question}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Duis iaculis sapien eget enim mattis laoreet. 
          Pellentesque commodo felis vel tellus rutrum, et tristique metus dictum. 
          Aliquam mollis felis in neque mattis sodales. Mauris at nulla id dolor pharetra iaculis. 
          Curabitur sodales nisi eu purus eleifend, eget finibus purus posuere. 
          Suspendisse vehicula iaculis volutpat. Suspendisse bibendum ipsum at orci sodales volutpat.
        </div>
        
        <form className={styles.options}>
          <label className={`${styles.option} ${checkedOption == "A" && styles.active}`}>
            <span>A</span>
            <input checked={checkedOption == "A"} onChange={() => setCheckedOption("A")} type="radio" name="option" />
            Opção 1
          </label>
          <label className={`${styles.option} ${checkedOption == "B" && styles.active}`}>
            <span>B</span>
            <input checked={checkedOption == "B"} onChange={() => setCheckedOption("B")} type="radio" name="option" />
            Opção 2
          </label>
          <label className={`${styles.option} ${checkedOption == "C" && styles.active}`}>
            <span>C</span>
            <input checked={checkedOption == "C"} onChange={() => setCheckedOption("C")} type="radio" name="option" />
            Opção 3
          </label>
          <label className={`${styles.option} ${checkedOption == "D" && styles.active}`}>
            <span>D</span>
            <input checked={checkedOption == "D"} onChange={() => setCheckedOption("D")} type="radio" name="option" />
            Opção 4
          </label>
        </form>    
      </main>
    
      <footer className={styles.timer}>
        <div className={styles.bartimercontainer}>
          <div className={styles.bartimer} style={{ width: `${100*(timer - 1)/initialTimer}%` }}></div>
        </div>
        <h3>{Math.floor(timer/60) < 10 ? "0": ""}{Math.floor(timer/60)}:{timer%60 < 10 ? "0": ""}{timer%60}</h3>
      </footer>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      room: params.room
    }, // will be passed to the page component as props
  }
}
