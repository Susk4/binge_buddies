import ReleaseYearRange from "./ReleaseYearRange";
import GenreList from "./GenreList";
import ProviderList from "./ProviderList";


const UserFilter = ({ user }) => {
  

  return (
    <div>
      <h1 className="text-3xl text-center text-orange-900">
        What are you looking for?
      </h1>
      <ReleaseYearRange />
      <GenreList />
      <ProviderList />
    </div>
  );
};

export default UserFilter;
