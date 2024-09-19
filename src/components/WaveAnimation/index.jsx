import React from 'react';
import styles from './WaveAnimation.module.css';

const WaveAnimation = () => {
  return (
    <div className={styles.waveContainer}>
      <svg className={styles.svgWave} viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path
          className={styles.wave1}
          d="M0,100 C300,200 900,0 1200,100 L1200,200 L0,200 Z"
          fill="rgba(10, 10, 10, 0.8)"
        ></path>
        <path
          className={styles.wave2}
          d="M0,150 C400,250 800,50 1200,150 L1200,200 L0,200 Z"
          fill="rgba(30, 30, 30, 0.5)"
        ></path>
      </svg>
    </div>
  );
};

export default WaveAnimation;
