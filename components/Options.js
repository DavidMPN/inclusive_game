import styles from '../styles/Options.module.scss'
import { useEffect, useState } from 'react';

export default function Options(){
    const [checkedOption, setCheckedOption] = useState("");

    return (
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
  )
}