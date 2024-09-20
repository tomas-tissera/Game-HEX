import styles from "./game.module.css"
import Alatorio from "../alatorio";
import Ingresar from "../ingresa";
const Game = () => {
   
    return (
        <>
           <div className={styles.contPadre} >
                <div className={styles.contElementos}>

                    <h2>Bienvenido!</h2>
                    <div>
                        <Alatorio/>
                    </div>
                    <div>
                        <Ingresar/>
                    </div>
                </div>
                
            </div>
        </>
)};
export default Game;