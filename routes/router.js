/* eslint-disable prefer-destructuring */
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const{ getMovies } = require("../api/requestMovies");
const{ getShows } = require("../api/requestShow");
const{ getBooks } = require("../api/requestBook");

const port = process.env.PORT || 9000;
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public"), { extensions: ["html"] }));
app.listen(port);
console.log(`Listening on port ${port}!`);

app.get("/api/movie", async (req, res) => {
  const query = req.url.split("?").slice(-1)[0];
  console.log("Movie requested");
  const data = await getMovies(query);
  res.json(data);
});

app.get("/api/tv", async (req, res) => {
  const query = req.url.split("?").slice(-1)[0];
  console.log("TV Show requested");
  const data = await getShows(query);
  res.json(data);
});

app.get("/api/book", async (req, res) => {
  const query = req.url.split("?").slice(-1)[0];
  console.log("Book requested", query);
  const data = await getBooks(query);
  res.json(data);
});

module.exports = app;
