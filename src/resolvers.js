const { FakeLib, Some, None, Admin, Guest } = require("./entities");

const fakeLib = new FakeLib();

const rootValue = {
  addBook: ({ book }) => {
    return fakeLib.create(book);
  },

  getBook: ({ isbn }) => {
    const row = fakeLib.select((book) => book.isbn === Number(isbn));
    if (row.length > 0) {
      return row[0];
    } else {
      throw new Error(`no book exists with isbn ${isbn}`);
    }
  },

  addAuthor: ({ isbn, author }) => {
    return fakeLib.update(
      (book) => {
        if (book.isbn === Number(isbn)) {
          book.authors.push(author);
        }
        return book;
      },
      (book) => book.isbn === Number(isbn)
    );
  },

  getAllBooks: () => {
    return fakeLib.select(() => true);
  },

  calculateValue: ({ num }) => {
    return num % 2 === 0
      ? {
          __typename: "Some",
          ...new Some(num),
        }
      : {
          __typename: "None",
          ...new None(num),
        };
  },

  retrieveUser: ({ num }) => {
    return num % 2 === 0
      ? {
          __typename: "Admin",
          ...new Admin(num, `Admin-${num}`, `title-${num}`, ["admin"]),
        }
      : {
          __typename: "Guest",
          ...new Guest(num, `Guest-${num}`, `token-${num}`),
        };
  },
};

module.exports = rootValue;
