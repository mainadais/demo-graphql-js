const { FakeDie, FakeLib, Some, None, Admin, Guest } = require("../entities");

const fakeLib = new FakeLib();

const rootValue = {
  hello: () => {
    return "hello world";
  },

  rollDice: ({ numDice, numSides }) => {
    var output = [];
    for (let i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  },

  getDie: ({ numSides }) => {
    return new FakeDie(numSides || 6);
  },

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

  getAvailableBooks: () => {
    return fakeLib.select((book) => book.available);
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

module.exports = rootValue
