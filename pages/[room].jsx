import axios from 'axios';
import useSWR from 'swr';

import QuestionPage from '../layouts/QuestionPage';
import WaitPage from '../layouts/WaitPage';

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

export default function Room({ room }) {
  const { data, isLoading } = usePlayer(room);
  
  if(isLoading) {
    return <h1 style={{textAlign: "center"}}>Carregando...</h1>
  }

  if(data.status) {
    if(data.isStarted) {
      return (
        <QuestionPage question={data.curQuestion} />
      )    
    }

    return (
      <WaitPage data={data} room={room} />
    );
  }

  return <h1 style={{textAlign: "center"}}>Você não pode entrar nessa sala</h1>
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      room: params.room
    }, // will be passed to the page component as props
  }
}
