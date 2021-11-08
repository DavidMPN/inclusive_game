import styles from '../styles/Navbar.module.scss'
import Link from 'next/link'

import { RiHome2Line } from "react-icons/ri";
import { FiSettings } from 'react-icons/fi';

import SettingsMenu from './SettingsMenu';
import { useState } from 'react';

function NavBar() {
    const [ settingsShowing, setSettingsShowing ] = useState(false);

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles.navitem}>
                    <Link href="/">
                        <a title="inicio">
                            <RiHome2Line size={35} color="#777" />
                        </a>
                    </Link>
                </div>
                <div className={styles.navitem}>
                    <h1>
                        4ALL
                    </h1>
                </div>
                <div className={styles.navitem}>
                    <button onClick={() => { setSettingsShowing(true) }} title="Configurações">
                        <FiSettings size={35} color="#777"/>
                    </button>
                </div>
            </nav>
            <SettingsMenu 
                isShowed={settingsShowing} 
                onClose={() => setSettingsShowing(false)}
            />
        </header>
    );
}

export default NavBar;