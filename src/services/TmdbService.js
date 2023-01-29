class TmdbService {
  constructor() {
    this.apiKey = "c46784e3d514ed9b482eb9093a091468";
    this.baseUrl = "https://api.themoviedb.org/3";

    this.searchUrl = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=`;
    this.movieUrl = `${this.baseUrl}/movie/`;

    this.genreUrl = `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`;
    this.providerUrl = `${this.baseUrl}/watch/providers/movie?api_key=${this.apiKey}`;

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
}

export default new TmdbService();
