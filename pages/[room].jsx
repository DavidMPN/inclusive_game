import styles from '../styles/Home.module.scss';

import { FiBluetooth, FiSettings } from 'react-icons/fi';
import { useEffect, useState } from 'react';

import Question from '../components/Question';
import Options from '../components/Options';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SettingsMenu from '../components/SettingsMenu'
import axios from 'axios';
import useSWR from 'swr';

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

  console.log(data);

  if(isLoading) {
    return <h1>Carregando...</h1>
  }

  if(data.status) {
    if(data.isStarted) {
      return (
        <div className={styles.container}>

          <SettingsMenu/>

          <Header/>

          <main>
            <Question/>
            <Options/>
          </main>
        
          <Footer/>
        </div>
      )    
    }
    return (
      <ul>
        {data.players.map(player => <li key={player.id}>{player.name}</li>)}
      </ul>
    );
  }

  return <h1>Você não pode entrar nessa sala</h1>
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      room: params.room
    }
  }
}
