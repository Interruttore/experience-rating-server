const config = require("../config/config");
const{ makeRequest } = require("./request");
const genreUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${config.TMDB_API}&language=en-US`;
const baseUrl = `https://api.themoviedb.org/3/search/tv?api_key=${config.TMDB_API}&`;

exports.getShows = async function (query) {
  const showResults = [];
  const genres = await makeRequest(genreUrl).
    then((res) => res.data).
    catch((err) => {
      console.log(err);
      throw err;
    });
  const data = await makeRequest(baseUrl, query).
    then((res) => res.data).
    catch((err) => {
      console.log(err);
      throw err;
    });
  for(const show of data.results) {
    const genresName = [];

    for(const id of show.genre_ids) {
      for(const genre of genres.genres) {
        if(id === genre.id) {
          genresName.push(genre.name);
        }
      }
    }
    showResults.push({
      genresName,
      originalTitle: show.original_name,
      posterPath: show.poster_path,
      releaseDate: show.first_air_date
    });
  }
  return showResults;
};
