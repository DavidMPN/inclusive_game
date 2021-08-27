import styles from '../styles/SettingsMenu.module.scss'

function CloseSettings(event){
    if(event.target.id == 'blur_container'){
        event.target.style.display = 'none';
    }
}

function SettingsMenu(){
    return (
        <div className = {styles.blur} id = "blur_container" onClick = {CloseSettings} style = {{display:'none'}}>
            <div className = {styles.inclusive_menu} id = "inc_menu" ></div>
        </div>
    
    )
}

export default SettingsMenu