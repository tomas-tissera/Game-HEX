import { useState, useEffect } from "react";
import styles from "./Alatorio.module.css";

const Alatorio = () => {
    const [bgColor, setBgColor] = useState(() => {
        // Al iniciar, obtén el color almacenado en localStorage (si existe)
        
        return localStorage.getItem("bgColor") || "#ffffff"; // Color blanco por defecto
        
    });

    // Función para generar un color aleatorio en formato hexadecimal
    const generateRandomColor = () => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        return randomColor;
    };

    const newColor = generateRandomColor();
    // Función para manejar el clic en el botón
    const handleGenerateColor = () => {
        localStorage.removeItem("bgColor"); // Limpia el color previo almacenado
        localStorage.setItem("bgColor", newColor); // Guarda el nuevo color
        setBgColor(newColor); // Aplica el nuevo color como fondo
    };

    return (
        <div className={styles.container}>
            <div
                className={styles.contColor}
                style={{ backgroundColor: bgColor }}
            >
                Alatorio
            </div>
            <button className={styles.button} onClick={handleGenerateColor}>
                Generar
            </button>
        </div>
    );
};

export default Alatorio;
