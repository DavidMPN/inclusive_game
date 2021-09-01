import styles from '../styles/Header.module.scss'

import { FiBluetooth, FiSettings } from 'react-icons/fi';

function SettingsMenuToggle() {
    let x = document.getElementById("blur_container");
    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}

function Header(){
    return (
        <header className = {styles.header_box}>
            <h1>4ALL</h1>
            <button onClick = {SettingsMenuToggle} title="Configurações">
                <FiSettings size={35} color="#777"/>
            </button>
        </header>
    )
}

export default Header;