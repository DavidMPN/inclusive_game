import styles from '../styles/Options.module.scss'
import { useEffect, useState } from 'react';

export default function Options({ texts }){
    const [checkedOption, setCheckedOption] = useState("");

    return (
        <form className={styles.options}>
          <label className={`${styles.option} ${checkedOption == "A" && styles.active}`} title="Opção A">
            <span>A</span>
            <input checked={checkedOption == "A"} onChange={() => setCheckedOption("A")} type="radio" name="option" />
            {texts[0]}
          </label>
          <label className={`${styles.option} ${checkedOption == "B" && styles.active}`} title="Opção B">
            <span>B</span>
            <input checked={checkedOption == "B"} onChange={() => setCheckedOption("B")} type="radio" name="option" />
            {texts[1]}
          </label>
          <label className={`${styles.option} ${checkedOption == "C" && styles.active}`} title="Opção C">
            <span>C</span>
            <input checked={checkedOption == "C"} onChange={() => setCheckedOption("C")} type="radio" name="option" />
            {texts[2]}
          </label>
          <label className={`${styles.option} ${checkedOption == "D" && styles.active}`} title="Opção D">
            <span>D</span>
            <input checked={checkedOption == "D"} onChange={() => setCheckedOption("D")} type="radio" name="option" />
            {texts[3]}
          </label>
        </form>
  )
}