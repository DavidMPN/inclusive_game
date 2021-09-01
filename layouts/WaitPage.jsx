import styles from "../styles/Wait.module.scss";
import NavBar from "../components/NavBar";
import axios from "axios";

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { MdContentCopy } from 'react-icons/md';
import { useState } from "react";

// import { AiOutlineMinus } from 're'

export default function WaitPage({data, room}) {
    const [ copy, setCopy ] = useState("")
  
      return (
        <div className = {styles.container}>
            <NavBar/>
            <span>
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
                data.owner &&
                <>
                <h1>Configurações</h1>

                <div className = {styles.settings}>
                    <div className = {styles.game_time}>
                        <button ><AiOutlineMinus color="blue" size={20}/></button>
                        <h3>25.0</h3>
                        <button ><AiOutlinePlus color = "blue" size={20}/></button>
                    </div>
                    <div className = {styles.game_time}>
                        <button ><AiOutlineMinus color="blue" size={20}/></button>
                        <h3>35.0</h3>
                        <button ><AiOutlinePlus color = "blue" size={20}/></button>
                    </div>
                    <button 
                    className={styles.startBtn} 
                    onClick={ async () => { 
                        await axios.post("/api/room/start", { roomname: room });
                    }}
                    >
                        Começar
                    </button>
                </div>
                </>
            }   
            <h1>Jogadores</h1>

            <div className = {styles.players_list}>
                <ul className={styles.players}>
                    {data.players.map(player => <li key={player.id} className={styles.player}>{player.name}</li>)}
                </ul>
            </div>
        </div>
      );
}
