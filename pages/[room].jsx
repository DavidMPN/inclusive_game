import { useRouter } from 'next/dist/client/router';
import QuestionPage from '../layouts/QuestionPage';
import axios from 'axios';
import useSWR from 'swr';

import styles from "../styles/Wait.module.scss";

function usePlayer(room) {
  const { data, error } = useSWR('api/room/game', async (url) => {
    const response = await axios.post(url, { roomname: room })
    return response.data;
  }, { refreshInterval: 1000 });

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default function Room() {

  const router = useRouter();
  const { room } = router.query;
  const { data, isLoading } = usePlayer(room);
  
  console.log(data);

  if(isLoading) {
    return <h1>Carregando...</h1>
  }

  if(data.status) {
    if(data.isStarted) {
      return (
        <QuestionPage question={data.curQuestion} />
      )    
    }

    return (
      // <WaitPage>
      <>
        <button 
          className={styles.startBtn} 
          onClick={ async () => { 
            await axios.post("/api/room/start", { roomname: room });
          }}
        >
          Começar
        </button>
        <ul className={styles.container}>
          {data.players.map(player => <li key={player.id} className={styles.player}>{player.name}</li>)}
        </ul>
      </>
    );
  }

  return <h1>Você não pode entrar nessa sala</h1>
}