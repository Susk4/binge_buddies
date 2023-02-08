import React, { useState } from "react";
import styles from "../../styles/flipCard/flipCard.module.css";

const FlippableCard = ({ item }) => {
  const [flipCard, setflipCard] = useState(false);
  return (
    <div
      className={` ${flipCard ? styles.flipCard : ""} ${
        styles.thecard
      } rounded-xl`}
    >
      <div className={`${styles.thefront} rounded-xl`}>
        <h1 className="flex-grow flex items-center">Front of Card</h1>
        <button onClick={() => setflipCard((prev) => !prev)}>Flip 🔃</button>
      </div>

      <div className={`${styles.theback} rounded-xl`}>
        <h1 className="flex-grow flex items-center">Back of Card</h1>
        <button onClick={() => setflipCard((prev) => !prev)}>Flip 🔃</button>
      </div>
    </div>
  );
};

export default FlippableCard;
