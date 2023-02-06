import React from "react";
import dynamic from "next/dynamic";
import { useState, useRef, useMemo, createRef } from "react";

const TinderCard = dynamic(() => import("react-tinder-card"), {
  ssr: false,
});
const db = [
  {
    name: "Richard Hendricks",
    url: "./img/richard.jpg",
  },
  {
    name: "Erlich Bachman",
    url: "./img/erlich.jpg",
  },
  {
    name: "Monica Hall",
    url: "./img/monica.jpg",
  },
  {
    name: "Jared Dunn",
    url: "./img/jared.jpg",
  },
  {
    name: "Dinesh Chugtai",
    url: "./img/dinesh.jpg",
  },
];

const MovieCard = () => {
  const [lastDirection, setLastDirection] = useState();
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const currentIndexRef = useRef(currentIndex);
  const canSwipe = currentIndex >= 0;
  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => createRef()),
    []
  );
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };
  const swiped = (direction, nameToDelete, index) => {
    if (direction === "left") {
      console.log("You swiped: " + nameToDelete + " left!");
    }
    if (direction === "right") {
      console.log("You swiped: " + nameToDelete + " right!");
    }
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };
  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      console.log("swipe", currentIndex, childRefs[currentIndex]);
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative h-40 w-40">
        {db.map((person, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="absolute top-0 left-0 right-0 bottom-0 flex"
            key={person.name}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, person.name, index)}
            onCardLeftScreen={() => outOfFrame(person.name, index)}
          >
            <div className="rounded p-2 bg-white flex-grow flex justify-center items-center">
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="flex gap-2 p-2">
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={() => swipe("left")}
        >
          ❌Swipe left!
        </button>
        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={() => swipe("right")}
        >
          ❤ Swipe right!
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
