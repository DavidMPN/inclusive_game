import styles from '../styles/Home.module.scss';

import { FiBluetooth, FiSettings } from 'react-icons/fi';
import { useEffect, useState } from 'react';

import Question from '../components/Question';
import Options from '../components/Options';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SettingsMenu from '../components/SettingsMenu'

export default function Home({ room }) {

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

export async function getServerSideProps({ params }) {
  return {
    props: {
      room: params.room
    }, // will be passed to the page component as props
  }
}
