import axios from "axios";
import { useRouter } from "next/dist/client/router";
import styles from '../styles/Index.module.scss'

import NavBar from "../components/NavBar";
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { socketContext } from "../context/socket";


export default function Home() {
    const [ roomname,   setRoomname   ] = useState("");
    const [ playername, setPlayername ] = useState("");
    
    const { socket } = useContext(socketContext)

    const router = useRouter();
    
    useEffect(() => {
        if (socket) {
            socket.on('created', ({ wasCreated, room }) => {
                if(wasCreated) {
                    router.push(`/${room}`);
                } else {
                    alert("Algo deu errado!");
                }
            });

            socket.on('joined', ({ status, room }) => {
                if(status === "Entrou") {
                    router.push(`/${room}`)
                } else {
                    alert(status);
                }
            })
        }
    }, [socket]);

    async function submitJoin(data) {
        socket.emit("join", data);
    }
    
    async function submitCreate(data) {
        socket.emit("create", data);
    }

    return (
        <div className={styles.container}>
            <div className={styles.formularios}>
                <form className={styles.form} onSubmit={e => e.preventDefault()}>
                    <label>
                        <input 
                            name="room"
                            type="text" 
                            value={roomname} 
                            onChange={e => setRoomname(e.target.value)} 
                            placeholder="Digite o nome da sala"
                        />
                        <span>Nome da sala</span>
                    </label>
                    <label>
                        <input 
                            name="name"
                            type="text" 
                            value={playername} 
                            onChange={e => setPlayername(e.target.value)} 
                            placeholder="Digite o seu nome"
                        />
                        <span>Nome do jogador</span>
                    </label>

                    <div className={styles.buttonContainer}>
                        <button onClick={async () => await submitCreate({ roomname, playername })}>Criar</button>
                        <button onClick={async () => await submitJoin({ roomname, playername })}>Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}