import styles from '../styles/Home.module.css';
import { FiSettings } from 'react-icons/fi';
import { useState } from 'react';

export default function Home() {
  const [checkedOption, setCheckedOption] = useState("");

  return (
    <div className={styles.container}>
      <header>
        <h1>4ALL</h1>

        <button><FiSettings size={35} color="#555" /></button>
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
          <label className={`${styles.option} ${checkedOption == "A" && styles.active}`}><input checked={checkedOption == "A"} onChange={() => setCheckedOption("A")} type="radio" name="option" /></label>
          <label className={`${styles.option} ${checkedOption == "B" && styles.active}`}><input checked={checkedOption == "B"} onChange={() => setCheckedOption("B")} type="radio" name="option" /></label>
          <label className={`${styles.option} ${checkedOption == "C" && styles.active}`}><input checked={checkedOption == "C"} onChange={() => setCheckedOption("C")} type="radio" name="option" /></label>
          <label className={`${styles.option} ${checkedOption == "D" && styles.active}`}><input checked={checkedOption == "D"} onChange={() => setCheckedOption("D")} type="radio" name="option" /></label>
        </form>    
      </main>
    
      <footer className={styles.timer}>
        <div className={styles.bartimercontainer}><div className={styles.bartimer}></div></div>
        <h3>00:46</h3>
      </footer>
    </div>
  )
}
