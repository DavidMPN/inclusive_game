import styles from '../styles/SettingsMenu.module.scss'

import { CgCloseO } from "react-icons/cg";
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { useState } from "react";

function SettingsMenu({ isShowed, onClose }){

    const style = isShowed ? {display: "flex"} : {display:'none'};

    const [ checkedColor, setCheckedColor ] = useState("#005bd3");
    const [ rightColor, setRightColor ]     = useState("#00ff00");
    const [ wrongColor, setWrongColor ]     = useState("#ff0000");


    function CloseSettings(event){
        if(event.target.id == 'blur_container'){
            onClose();
        }
    }

    return (
        <div 
            className={styles.blur} 
            id="blur_container"
            style={style}
            onClick={CloseSettings}
        >
            <div className = {styles.inclusive_menu} id = "inc_menu" >
                <header>
                    <div className={styles.space}></div>
                    <h3>Configurações</h3>
                    <button onClick={() => onClose()}>
                        <CgCloseO size={35} color="#aaa" />
                    </button>
                </header>
                <main>
                    <label>
                        Tamanho da fonte
                        <div className={styles.stepper}>
                            <button onClick={() => {
                                const root = document.querySelector(":root");

                                root.style.fontSize = (parseInt(window.getComputedStyle(root, null).getPropertyValue('font-size'), 10) - 1) + "px";
                                
                            }}>
                                <AiOutlineMinus color="blue" size={25}/>
                            </button>
                            <h3>Aa</h3>
                            <button onClick={() => {
                                const root = document.querySelector(":root");

                                root.style.fontSize = (parseInt(window.getComputedStyle(root, null).getPropertyValue('font-size'), 10) + 1) + "px";
                            }}>
                                <AiOutlinePlus color = "blue" size={25}/>
                            </button>
                        </div>
                    </label>
                    <h3>Cor da opção</h3>
                    <label className={styles.colormenu}>
                        Selecionada&nbsp;
                        <input 
                            type="color" 
                            value={checkedColor} 
                            onChange={(e) => {
                                const color = e.target.value;
                                setCheckedColor(color);
                                document.querySelector(":root").style.setProperty("--checked-color", color);
                            }}
                        />
                    </label>
                    <label className={styles.colormenu}>
                        Acertada&nbsp;
                        <input 
                            type="color" 
                            value={rightColor} 
                            onChange={(e) => {
                                const color = e.target.value;
                                setRightColor(color)
                                document.querySelector(":root").style.setProperty("--right-color", color);
                            }}
                        />
                    </label>
                    <label className={styles.colormenu}>
                        Errada&nbsp; 
                        <input 
                            type="color" 
                            value={wrongColor}
                            onChange={(e) => {
                                const color = e.target.value;
                                setWrongColor(color);
                                document.querySelector(":root").style.setProperty("--wrong-color", color);
                            }}
                        />
                    </label>
                </main>
                <footer></footer>
            </div>
        </div>
    
    )
}

export default SettingsMenu