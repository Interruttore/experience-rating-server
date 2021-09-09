const{ makeRequest } = require("./request");
const baseUrl = `http://openlibrary.org/search.json?`;

exports.getBooks = async function (query) {
  const bookResults = [];
  let isbnExist = 0;
  let key = 0;

  const data = await makeRequest(baseUrl, query).
    then((res) => res.data).
    catch((err) => {
      console.log(err);
      throw err;
    });

  for(const book of data.docs) {
    key += 1;

    if(Object.prototype.hasOwnProperty.call(book, "isbn")) {
      console.log("isbn", book.isbn[0]);
      // eslint-disable-next-line prefer-destructuring
      isbnExist = book.isbn[0];
    }

    bookResults.push({
      authorName: book.author_name,
      firstPublishYear: book.first_publish_year,
      isbn: isbnExist,
      key,
      title: book.title
    });
  }
  return bookResults;
};
