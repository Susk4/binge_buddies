import styles from "../../styles/User/User.module.css";
import Image from "next/image";
import ProfileData from "./ProfileData";
import ReleaseYearRange from "./ReleaseYearRange";
import GenreList from "./GenreList";
import ProviderList from "./ProviderList";

const UserData = ({ user }) => {
  const providers = [
    "Netflix",
    "Hulu",
    "Disney+",
    "Amazon Prime",
    "HBO Max",
    "Apple TV+",
  ];
  return (
    <div className={`${styles.card} bg-orange-100 rounded-xl p-2 flex flex-col gap-2`}>
      <ProfileData user={user} />
      <div>
        <hr className="border-gray-400"/>
      </div>
      <div>
        
        <h1 className="text-3xl text-center text-orange-900">What are you looking for?</h1>
        <ReleaseYearRange />
        <GenreList />
        <ProviderList />
      </div>
    </div>
  );
};

export default UserData;
