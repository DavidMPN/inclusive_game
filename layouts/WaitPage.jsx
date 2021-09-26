import styles from "../styles/Wait.module.scss";
import NavBar from "../components/NavBar";
import axios from "axios";

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { MdContentCopy } from 'react-icons/md';
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { socketContext } from "../context/socket";

// import { AiOutlineMinus } from 're'

export default function WaitPage({data, room, owner}) {
    const { socket } = useContext(socketContext);

    const [ copy, setCopy ] = useState("")
    const [gameTime , setTempoJogo] = useState(30)
    const [questionsAmount , setQuestionsAmount] = useState(10)

      return (
        <div className = {styles.container}>
            <main>
                <span className={styles.copyContainer}>
                    {room}
                    <button 
                        title="Clique para copiar o nome da sala" 
                        onClick={() => {
                            navigator.clipboard.writeText(room);
                            setCopy("Copiado!");
                        }}
                    >
                        <MdContentCopy size={20} />
                    </button>
                    {copy}
                </span>
                {
                    owner &&
                    <>
                    <div className = {styles.settings}>
                    <label>Tempo de resposta
                        <div className = {styles.game_time}>
                            <button onClick={() => {
                                if (gameTime-1 > 0){
                                    setTempoJogo(gameTime - 1)
                                }
                            }}><AiOutlineMinus color="blue" size={25}/></button>
                            <h3>{gameTime}</h3>
                            <button onClick={() => setTempoJogo(gameTime +1)}><AiOutlinePlus color = "blue" size={25}/></button>
                        </div>
                    </label>
                    <label> Quantidade de perguntas
                        <div className = {styles.game_time}>
                            <button onClick={() => {
                                if (questionsAmount-1 > 0){
                                    setQuestionsAmount(questionsAmount - 1)
                                }
                            }}><AiOutlineMinus color="blue" size={25} /></button>
                            <h3>{questionsAmount}</h3>
                            <button onClick={() => {
                                if (questionsAmount+1 < data.maxQuestion){
                                    setQuestionsAmount(questionsAmount + 1)
                                }
                            }}><AiOutlinePlus color = "blue" size={25}/></button>
                        </div>
                    </label>
                        <button 
                        className={styles.startBtn} 
                        onClick={ 
                            () => {
                                socket.emit("start", { roomname: room, time: gameTime, questions_num: questionsAmount });
                            }
                        }
                        >
                            Começar
                        </button>
                    </div>
                    </>
                }
                <div className = {styles.players_list}>
                    <ul className={styles.players}>
                        {data.players.map(player => <li key={player.id} className={styles.player}>{player.name}</li>)}
                    </ul>
                </div>
            </main>
        </div>
      );
}
