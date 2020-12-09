const { FakeDie, FakeLib, Some, None, Admin, Guest } = require("../entities");

const fakeLib = new FakeLib();

const resolvers = {
  Query: {
    hello: () => {
      return "hello world!";
    },

    rollDice: (_, { numDice, numSides }) => {
      var output = [];
      for (let i = 0; i < numDice; i++) {
        output.push(1 + Math.floor(Math.random() * (numSides || 6)));
      }
      return output;
    },

    getDie: (_, { numSides }) => {
      return new FakeDie(numSides || 6);
    },

    getBook: (_, { isbn }) => {
      const row = fakeLib.select((book) => book.isbn === Number(isbn));
      if (row.length > 0) {
        return row[0];
      } else {
        throw new Error(`no book exists with isbn ${isbn}`);
      }
    },

    getAllBooks: () => {
      return fakeLib.select(() => true);
    },

    calculateValue: (_, { num }) => {
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

    retrieveUser: (_, { num }) => {
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
  },

  Mutation: {
    addBook: (_, { book }) => {
      return fakeLib.create(book);
    },

    addAuthor: (_, { isbn, author }) => {
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
  },

  Author: {
    books: ({ name }) => {
      return fakeLib.select((book) =>
        book.authors.some((author) => author.name === name)
      );
    },
  },
};

module.exports = resolvers;
