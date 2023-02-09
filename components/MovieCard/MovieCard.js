import Stack from "./Stack";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const db = [
  {
    adult: false,
    backdrop_path: "/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
    genre_ids: [28, 12, 878],
    id: 505642,
    original_language: "en",
    original_title: "Black Panther: Wakanda Forever",
    overview:
      "Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death.  As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.",
    popularity: 9051.476,
    poster_path: "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
    release_date: "2022-11-09",
    title: "Black Panther: Wakanda Forever",
    video: false,
    vote_average: 7.5,
    vote_count: 2671,
  },
  {
    adult: false,
    backdrop_path: "/faXT8V80JRhnArTAeYXz0Eutpv9.jpg",
    genre_ids: [16, 12, 35, 10751, 14],
    id: 315162,
    original_language: "en",
    original_title: "Puss in Boots: The Last Wish",
    overview:
      "Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.",
    popularity: 3910.547,
    poster_path: "/kuf6dutpsT0vSVehic3EZIqkOBt.jpg",
    release_date: "2022-12-07",
    title: "Puss in Boots: The Last Wish",
    video: false,
    vote_average: 8.6,
    vote_count: 3374,
  },
  {
    adult: false,
    backdrop_path: "/zGoZB4CboMzY1z4G3nU6BWnMDB2.jpg",
    genre_ids: [28, 10749, 35],
    id: 758009,
    original_language: "en",
    original_title: "Shotgun Wedding",
    overview:
      "Darcy and Tom gather their families for the ultimate destination wedding but when the entire party is taken hostage, “’Til Death Do Us Part” takes on a whole new meaning in this hilarious, adrenaline-fueled adventure as Darcy and Tom must save their loved ones—if they don’t kill each other first.",
    popularity: 3874.785,
    poster_path: "/t79ozwWnwekO0ADIzsFP1E5SkvR.jpg",
    release_date: "2022-12-28",
    title: "Shotgun Wedding",
    video: false,
    vote_average: 6.4,
    vote_count: 281,
  },
  {
    adult: false,
    backdrop_path: "/q2fY4kMXKoGv4CQf310MCxpXlRI.jpg",
    genre_ids: [878, 27, 35],
    id: 536554,
    original_language: "en",
    original_title: "M3GAN",
    overview:
      "A brilliant toy company roboticist uses artificial intelligence to develop M3GAN, a life-like doll programmed to emotionally bond with her newly orphaned niece. But when the doll's programming works too well, she becomes overprotective of her new friend with terrifying results.",
    popularity: 2438.483,
    poster_path: "/d9nBoowhjiiYc4FBNtQkPY7c11H.jpg",
    release_date: "2022-12-28",
    title: "M3GAN",
    video: false,
    vote_average: 7.6,
    vote_count: 1368,
  },
  {
    adult: false,
    backdrop_path: "/a4I481szRmycyreQTLrRe4f4YJe.jpg",
    genre_ids: [80, 53, 18],
    id: 842544,
    original_language: "en",
    original_title: "Transfusion",
    overview:
      "Ryan Logan, a former Special Forces operative, is battling to cope with life after the loss of his wife.  He is thrusted into the criminal underworld to keep his only son from being taken from him.",
    popularity: 2334.844,
    poster_path: "/bxh5xCCW9Ynfg6EZJWUkc1zqTnr.jpg",
    release_date: "2023-01-05",
    title: "Transfusion",
    video: false,
    vote_average: 6.8,
    vote_count: 38,
  },
  {
    adult: false,
    backdrop_path: "/qHdPNd1cUaSNYLLNgt1Pv3LVd0T.jpg",
    genre_ids: [878, 28, 12],
    id: 843794,
    original_language: "ko",
    original_title: "정이",
    overview:
      "On an uninhabitable 22nd-century Earth, the outcome of a civil war hinges on cloning the brain of an elite soldier to create a robot mercenary.",
    popularity: 2031.682,
    poster_path: "/z2nfRxZCGFgAnVhb9pZO87TyTX5.jpg",
    release_date: "2023-01-20",
    title: "JUNG_E",
    video: false,
    vote_average: 6.4,
    vote_count: 245,
  },
  {
    adult: false,
    backdrop_path: "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
    genre_ids: [878, 12, 28],
    id: 76600,
    original_language: "en",
    original_title: "Avatar: The Way of Water",
    overview:
      "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    popularity: 1635.498,
    poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    release_date: "2022-12-14",
    title: "Avatar: The Way of Water",
    video: false,
    vote_average: 7.7,
    vote_count: 5082,
  },
];

const MovieCard = () => {
  return (
    <div className="w-full h-full">
      <Stack onVote={(item, vote) => console.log(item, vote)} list={db}></Stack>
    </div>
  );
};

export default MovieCard;
