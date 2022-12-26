const GenreList = () => {
  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Historical",
    "Historical fiction",
    "Horror",
    "Magical realism",
    "Mystery",
    "Paranoid fiction",
    "Philosophical",
    "Political",
    "Romance",
    "Saga",
    "Satire",
    "Science fiction",
    "Social",
    "Speculative",
    "Thriller",
    "Urban",
    "Western",
  ];
  return (
    <div >
      <h2 className="text-xl text-orange-900">Genres:</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2 ml-10">
        {genres.map((genre, index) => (
          <div key={index} className="gap-1 flex">
            <input type="checkbox" id={genre} name={genre} value={genre} />
            <label htmlFor={genre} className="flex items-center">{genre}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
export default GenreList;
