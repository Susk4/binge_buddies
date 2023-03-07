class TmdbService {
  constructor() {
    this.apiKey = "c46784e3d514ed9b482eb9093a091468";
    this.baseUrl = "https://api.themoviedb.org/3";

    this.searchUrl = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=`;
    this.movieUrl = `${this.baseUrl}/movie/`;

    this.genreUrl = `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`;
    this.providerUrl = `${this.baseUrl}/watch/providers/movie?api_key=${this.apiKey}`;
    this.discoverUrl = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&include_adult=false&include_video=false&vote_count.gte=100&with_original_language=en`;

    this.providerList = [
      "Amazon Prime Video",
      "Disney Plus",
      "HBO Max",
      "Hulu",
      "Netflix",
    ];
  }

  async getGenres() {
    const genres = await fetch(this.genreUrl);
    const data = await genres.json();
    return data;
  }
  async getProviders() {
    const providers = await fetch(this.providerUrl);
    const providerData = await providers.json();
    const supportedProviders = providerData.results.filter((p) =>
      this.providerList.includes(p.provider_name)
    );
    return supportedProviders;
  }
  //discover movies by filter {genres, providers, release_year: {from,to}}
  async discoverMovies(filter, page, usersMovies) {
    const genres = await fetch(this.genreUrl);
    const genresData = await genres.json();
    const exludeGenres = genresData.genres
      .filter((g) => !filter.genres.includes(g.id))
      .map((g) => g.id);

    let url = this.discoverUrl;
    if (filter.genres.length > 0) {
      url += `&without_genres=${exludeGenres.join(",")}`;
    }

    if (filter.providers.length > 0) {
      url += `&with_watch_providers=${filter.providers.join(",")}`;
    }
    url += `&primary_release_date.gte=${filter.release_year.from}`;
    url += `&primary_release_date.lte=${filter.release_year.to}`;
    url += `&page=${page}`;
    const movies = await fetch(url);
    const data = await movies.json();
    if (data.results.length === 0) return data;

    const filteredResults = data.results.filter(
      (m) => !usersMovies.includes(m.id)
    );

    if (filteredResults.length === 0) {
      return this.discoverMovies(filter, page + 1, usersMovies);
    }
    data.results = filteredResults;

    return data;
  }
}

export default new TmdbService();
