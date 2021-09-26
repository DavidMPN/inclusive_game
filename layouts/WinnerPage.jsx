import styles from '../styles/Winner.module.scss'

import NavBar from '../components/NavBar'

export default function WinnerPage({ players }){
    console.log(players);

    const maxRightAnswers = players[0].rightAnswers;

    return (
        <div className = {styles.container}>
            <img src = "https://img.freepik.com/vetores-gratis/trofeu-de-ouro-com-a-placa-de-identificacao-do-vencedor-da-competicao_68708-545.jpg?size=338&ext=jpg"></img>
            <div className = {styles.players_list}>
                    <ul className={styles.players}>
                        {
                            players.map(player => (
                                <li key={player.id} className={`${styles.player} ${player.rightAnswers == maxRightAnswers && styles.winner}`}>
                                    {player.name}
                                </li>
                            ))
                        }
                    </ul>
            </div>
        </div>
    )
}