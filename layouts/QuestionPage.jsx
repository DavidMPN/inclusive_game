import Header from "../components/Header";
import Footer from "../components/Footer";
import Options from "../components/Options";
import Question from "../components/Question";
import SettingsMenu from "../components/SettingsMenu";

import styles from "../styles/Home.module.scss";

export default function QuestionPage({ question, curTime, time }) {
  return (
    <div className={styles.container}>
      <SettingsMenu />

      <Header />

      <main>
        <Question text={question.question} />
        <Options texts={[question.A, question.B, question.C, question.D]} />
      </main>

      <Footer time={time} curTime={curTime} />
    </div>
  );
}
