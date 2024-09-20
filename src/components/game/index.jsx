import styles from "./game.module.css"
import Alatorio from "../alatorio";
const Game = () => {
   
    return (
        <>
           <div className={styles.contPadre} >
                <div className={styles.contElementos}>

                    <h2>Bienvenido!</h2>
                    <div>
                        <Alatorio/>
                    </div>
                </div>
                
            </div>
        </>
)};
export default Game;