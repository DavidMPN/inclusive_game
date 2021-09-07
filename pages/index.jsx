import axios from "axios";
import { useRouter } from "next/dist/client/router";
import styles from '../styles/Index.module.scss'

import NavBar from "../components/NavBar";
import { useState } from "react";

export default function Home() {
    const [ roomname,   setRoomname   ] = useState("");
    const [ playername, setPlayername ] = useState("");

    const router = useRouter();

    async function submitJoin(data) {
        const res = await axios.post("api/room/join", data);
        console.log(res, data);

        if (res.data.join) {
            router.push(`/${data.roomname}`);
        }
    }

    async function submitCreate(data) {
        const res = await axios.post("api/room/create", data);
        console.log(res, data);

        if (res.data.created) {
            router.push(`/${data.roomname}`);
        }
    }

    return (
        <div className={styles.container}>
            <NavBar />
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