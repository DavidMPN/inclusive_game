import Header from "../components/Header";
import Footer from "../components/Footer";
import Options from "../components/Options";
import Question from "../components/Question";
import SettingsMenu from "../components/SettingsMenu";

import styles from "../styles/Home.module.scss";
import { useState } from "react";

export default function QuestionPage({ question, room }) {
  const [ checked, setChecked ] = useState("");

  return (
    <div className={styles.container}>
      <main>
        <Question text={question.question} />
        <Options texts={[question.A, question.B, question.C, question.D]} room={room} />
      </main>

      <Footer room={room} checked={checked} />
    </div>
  );
}
