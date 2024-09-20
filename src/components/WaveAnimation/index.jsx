// FondoInteractivo.js
import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import styles from "./FondoInteractivo.module.css"

const FondoInteractivo = () => {
  const particlesInit = async (main) => {
    // Load tsparticles package
    await loadFull(main);
  };

  const particlesOptions = {
    background: {
      color: {
        value: "#000D26", // Color azul oscuro con tinte violeta
      },
    },
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff", // Color blanco para los copos de nieve
      },
      opacity: {
        value: 0.7,
      },
      size: {
        value: 3,
        random: true,
      },
      move: {
        direction: "bottom",
        enable: true,
        speed: 2,
      },
    },
  };

  return (
    <div className={styles.fondoContainer}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
      />
    </div>
  );
};

export default FondoInteractivo;
