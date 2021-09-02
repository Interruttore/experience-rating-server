const axios = require("axios");

exports.makeRequest = function (url, query = "") {
  console.log("QUERY", url + query);
  const data = axios.get(url + query);
  return data;
};
