import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";
import styles from '../styles/Index.module.scss'

import NavBar from "../components/NavBar";
import WaitPage from "../layouts/WaitPage";

export default function Home() {
    const { register: registerJoin, handleSubmit: handleSubmitJoin } = useForm();
    const { register: registerCreate, handleSubmit: handleSubmitCreate } = useForm();

    const router = useRouter();

    async function submitJoin(data) {
        const res = await axios.post("api/room/join", data);

        if (res.data.join) {
            router.push(`/${data.roomname}`);
        }
    }

    async function submitCreate(data) {
        const res = await axios.post("api/room/create", data);

        if (res.data.created) {
            router.push(`/${data.roomname}`);
        }
    }

    return (
        <div className={styles.container}>
            <NavBar />
            <div className={styles.formularios}>

                <form className={styles.form} onSubmit={handleSubmitJoin(submitJoin)}>
                    <input type="text" {...registerJoin("roomname")} placeholder="Nome da Sala" />
                    <input type="text" {...registerJoin("playername")} placeholder="Nome do Jogador" />
                    <button type="submit">Entrar</button>
                </form>

                <form className={styles.form} onSubmit={handleSubmitCreate(submitCreate)}>
                    <input type="text" {...registerCreate("roomname")} placeholder="Nome da Sala" />
                    <input type="text" {...registerCreate("playername")} placeholder="Nome do Jogador" />
                    <button type="submit">Criar</button>
                </form>

            </div>
        </div>
    )
}