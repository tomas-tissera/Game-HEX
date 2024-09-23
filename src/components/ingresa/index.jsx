import { useRef, useState, useEffect } from "react";
import styles from "./Ingresar.module.css";
import Confetti from "react-confetti";
import Swal from "sweetalert2";

const Ingresar = () => {
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
  const [isCounting, setIsCounting] = useState(false);
  const [time, setTime] = useState(0);
  const inputRefs = Array.from({ length: 7 }, () => useRef(null));

  useEffect(() => {
    let timer;
    if (isCounting) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCounting]);

  const handleCheck = () => {
    const storedColor = localStorage.getItem("bgColor") || "#1384b8";
    const arr = Array.from(storedColor);

    const newMatches = Object.values(values).map((value, index) => {
      return arr[index] && value === arr[index];
    });

    setMatches((prevMatches) => {
      const updatedMatches = prevMatches.map((match, index) => match || newMatches[index]);
      if (updatedMatches.every(Boolean)) {
        setShowConfetti(true);
        setIsCounting(false); // Detener el contador
        setTimeout(() => {
          setShowConfetti(false); // Ocultar el confetti después de 15 segundos
        }, 15000); // Duración máxima del confetti
        showCompletionAlert(); // Mostrar la alerta personalizada
      }
      return updatedMatches;
    });
  };

const showCompletionAlert = () => {
  Swal.fire({
    title: '¡Coincidencia!',
    text: `Tardaste ${time} segundos.`,
    icon: 'success',
    showCancelButton: true,
    confirmButtonText: 'Jugar de nuevo',
    cancelButtonText: 'Compartir tiempo',
    backdrop: true,
    onClose: () => {
      resetInputs(); // Limpiar los inputs cuando se cierra la alerta
      setShowConfetti(false); // Ocultar el confetti
    }
  }).then((result) => {
    if (result.isConfirmed) {
      resetInputs(); // Reiniciar juego
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      shareTime(); // Compartir tiempo
    }
  });
};


const shareTime = () => {
  const shareMessage = `¡He encontrado el color en ${time} segundos! ¿Puedes hacerlo mejor?`; // Mensaje personalizado
  const url = window.location.href; // URL de la página actual

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(url)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(shareMessage)}`;

  // Mostrar opciones para compartir
  Swal.fire({
    title: 'Compartir tu tiempo',
    text: 'Elige la red social donde quieras compartir:',
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Twitter',
    cancelButtonText: 'LinkedIn',
    backdrop: true,
  }).then((result) => {
    if (result.isConfirmed) {
      window.open(twitterShareUrl, '_blank'); // Abrir en Twitter
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      window.open(linkedInShareUrl, '_blank'); // Abrir en LinkedIn
    }
  });
};


  const resetInputs = () => {
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
    setTime(0); // Reiniciar el tiempo
    setIsCounting(false); // Detener el conteo
  };

  const handleChange = (e, nextInputRef, prevInputRef, inputKey) => {
    const newValue = e.target.value;

    setValues((prevValues) => ({
      ...prevValues,
      [inputKey]: newValue
    }));

    if (newValue.length === e.target.maxLength) {
      if (nextInputRef && nextInputRef.current) {
        nextInputRef.current.focus();
      }
    } else if (newValue === "" && prevInputRef && prevInputRef.current) {
      prevInputRef.current.focus();
    }
  };

  const startGame = () => {
    resetInputs(); // Reiniciar los inputs
    setIsCounting(true); // Iniciar el conteo
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
            onChange={(e) => handleChange(
              e,
              inputRefs[index + 1] || null,
              inputRefs[index - 1] || null,
              `input${index}`
            )}
            style={{
              backgroundColor: matches[index] ? 'green' : 'transparent',
              color: matches[index] ? 'white' : 'black'
            }}
            disabled={matches[index]}
          />
        ))}
      </div>
      <div className={styles.conBtn}>
        <button className={styles.button} onClick={() => {
          if (!isCounting) {
            startGame(); // Iniciar el juego y el contador solo la primera vez
          }
          handleCheck(); // Siempre chequear
        }}>
          Chequear
        </button>
      </div>
      {isCounting && <div>Tiempo: {time} segundos</div>}
    </div>
  );
};

export default Ingresar;
