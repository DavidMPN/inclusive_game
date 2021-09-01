import styles from '../styles/Question.module.scss'

export default function Question({ text }){
    return (
        <div className={styles.question}>
            {text}
        </div>
  )
}