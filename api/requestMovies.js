const config = require("../config/config");
const{ makeRequest } = require("./request");
const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${config.TMDB_API}&language=en-US`;
const baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${config.TMDB_API}&`;

exports.getMovies = async function (query) {
  let key = 0;
  const moviesResults = [];

  console.log("Requesting genres");
  const genres = await makeRequest(genreUrl).
    then((res) => res.data).
    catch((err) => {
      console.log(err);
      throw err;
    });

  console.log("Requesting movie");
  const data = await makeRequest(baseUrl, query).
    then((res) => res.data).
    catch((err) => {
      console.log(err);
      throw err;
    });

  for(const movie of data.results) {
    key += 1;
    const genresName = [];
    for(const id of movie.genre_ids) {
      for(const genre of genres.genres) {
        if(id === genre.id) {
          genresName.push(genre.name);
        }
      }
    }
    moviesResults.push({
      genresName,
      key,
      originalTitle: movie.original_title,
      overview: movie.overview,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date
    });
  }
  return moviesResults;
};
