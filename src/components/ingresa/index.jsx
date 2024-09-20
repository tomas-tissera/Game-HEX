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
  const [showConfetti, setShowConfetti] = useState(false);

  // Referencias para cada input
  const inputRefs = Array.from({ length: 7 }, () => useRef(null));

  useEffect(() => {
    console.log("Valores actualizados: ", values);
  }, [values]);

  const handleCheck = () => {
    const storedColor = localStorage.getItem("bgColor") || "#1384b8";
    const arr = Array.from(storedColor);

    const newMatches = Object.values(values).map((value, index) => {
      return arr[index] && value === arr[index];
    });

    setMatches((prevMatches) => {
      const updatedMatches = prevMatches.map((match, index) => match || newMatches[index]);
      // Si todas las coincidencias son verdaderas, muestra confetti y limpia los inputs
      if (updatedMatches.every(Boolean)) {
        setShowConfetti(true);
        setTimeout(() => {
          setValues({
            input0: "#",
            input1: "",
            input2: "",
            input3: "",
            input4: "",
            input5: "",
            input6: ""
          });
          setMatches([false, false, false, false, false, false]);
          setShowConfetti(false); // Oculta el confetti después de un tiempo
        }, 3000); // Muestra confetti por 3 segundos
      }
      return updatedMatches;
    });
  };

  const handleChange = (e, nextInputRef, inputKey) => {
    const newValue = e.target.value;

    setValues((prevValues) => ({
      ...prevValues,
      [inputKey]: newValue
    }));

    if (newValue.length === e.target.maxLength) {
      if (nextInputRef && nextInputRef.current) {
        nextInputRef.current.focus();
      }
    }
  };

  const getContainerBackgroundColor = () => {
    const hexValue = `#${values.input1}${values.input2}${values.input3}${values.input4}${values.input5}${values.input6}`;
    return hexValue.length === 7 ? hexValue : 'white';
  };

  return (
    <div>
      {showConfetti && <Confetti />}
      <div className={styles.contIngresar} style={{ backgroundColor: getContainerBackgroundColor() }}>
        {inputRefs.map((ref, index) => (
          <input
            key={index}
            ref={ref}
            maxLength={1}
            value={values[`input${index}`]}
            onChange={(e) => handleChange(e, inputRefs[index + 1] || null, `input${index}`)}
            style={{ 
              backgroundColor: matches[index] ? 'green' : 'transparent',
              color: matches[index] ? 'white' : 'black'
            }}
            disabled={matches[index]}
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
