import { useRef, useState, useEffect } from "react";
import styles from "./Ingresar.module.css";
import Confetti from "react-confetti";

const Ingresar = () => {
  // Estados para cada input
  const [values, setValues] = useState({
    input0: "#",
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: ""
  });

  const [matches, setMatches] = useState([false, false, false, false, false, false]);
  const [celebrate, setCelebrate] = useState(false); // Estado para controlar el confetti

  // Referencias para cada input
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  // useEffect para imprimir valores actualizados
  useEffect(() => {
    console.log("Valores actualizados: ", values);
  }, [values]);

  // Función para manejar el clic en el botón Chequear
  const handleCheck = () => {
    console.log("chequea");
    
    const storedColor = localStorage.getItem("bgColor") || "#1384b8"; // Valor por defecto para pruebas
    console.log("Color almacenado:", storedColor);

    // Convierte el color almacenado en un array
    const arr = Array.from(storedColor);

    console.log("arr", arr);
    console.log("values", values);
    
    // Verificar coincidencias por posición
    const newMatches = Object.values(values).map((value, index) => {
      const isMatch = arr[index] && value === arr[index];
      console.log(`Comparando valor ingresado: ${value} con ${arr[index]} => ${isMatch}`);
      return isMatch;
    });

    setMatches((prevMatches) => {
      const updatedMatches = prevMatches.map((match, index) => match || newMatches[index]);
      // Verifica si todos los inputs coinciden
      if (updatedMatches.every(match => match)) {
        setCelebrate(true); // Activa el confetti
        setTimeout(() => setCelebrate(false), 10000); // Desactiva el confetti después de 3 segundos
      }
      return updatedMatches;
    });

    console.log("Nuevas coincidencias:", newMatches);
  };

  const handleChange = (e, nextInputRef, inputKey) => {
    const newValue = e.target.value;

    setValues((prevValues) => ({
      ...prevValues,
      [inputKey]: newValue
    }));

    // Mueve el foco al siguiente input si se alcanza el maxLength
    if (newValue.length === e.target.maxLength) {
      if (nextInputRef && nextInputRef.current) {
        nextInputRef.current.focus();
      }
    }
  };

  const getContainerBackgroundColor = () => {
    // Genera el color basado en los valores actuales
    const hexValue = `#${values.input1}${values.input2}${values.input3}${values.input4}${values.input5}${values.input6}`;
    return hexValue.length === 7 ? hexValue : 'white'; // Devuelve el color formado por values o blanco si no es válido
  };

  return (
    <div>
      {celebrate && <Confetti />}
      <div className={styles.contIngresar} style={{ backgroundColor: getContainerBackgroundColor() }}>
        {inputRefs.map((ref, index) => (
          <input
            key={index}
            ref={ref}
            maxLength={1}
            value={values[`input${index}`]}
            onChange={(e) => handleChange(e, inputRefs[index + 1] || null, `input${index}`)}
            style={{ 
              backgroundColor: matches[index] ? 'green' : 'transparent', // Color verde para coincidencias
              color: matches[index] ? 'white' : 'black' // Cambia el color del texto
            }}
            disabled={matches[index]} // Deshabilita el input si coincide
          />
        ))}
      </div>
      <div className={styles.conBtn}>
        <button className={styles.button} onClick={handleCheck}>
          Chequear
        </button>
      </div>
    </div>
  );
};

export default Ingresar;
