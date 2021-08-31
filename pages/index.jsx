import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";
import styles from '../styles/Index.module.scss'

export default function Home() {
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    async function submit(data) {
        const res = await axios.post("api/room/join", data);

        if(res.data.join) {
            router.push(`/${data.roomname}`);
        }

        console.log(res.data);
    }

    return (
        <div className = {styles.container}>
            <nav>
                <h1 className = {styles.navbar}>4ALL</h1>
            </nav>
            <div className = {styles.formularios}>

                <form className = {styles.form} onSubmit={handleSubmit(submit)}>
                    <input type="text" {...register("roomname")}  placeholder= "Sala"/>
                    <input type="text" {...register("playername")} placeholder= "Nome"/>
                    <button type="submit">Entrar</button>
                </form>
                
                <form className = {styles.form}>
                    <input type="text" placeholder= "Sala"/>
                    <input type="text" placeholder= "Usuário"/>
                    <button type="submit">Criar</button>
                </form>

            </div>
        </div>

    )
}