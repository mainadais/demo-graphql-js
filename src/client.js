const axios = require("axios");

const getAllBooks = async () => {
  return await axios
    .post(
      "http://localhost:3000/graphql",
      {
        query: `
        query bookStore{
            getAllBooks{
              isbn
              title
              available
              authors{
                name
              }
            }
          }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then((res) => res.data.data.getAllBooks)
    .catch((err) => ({
      error: err.response.data.errors[0].message || err.message,
    }));
};

const addNewBook = async () => {
  return await axios
    .post(
      "http://localhost:3000/graphql",
      {
        query: `
        mutation addNewBook{
            addBook(book: {title: "Shalom"}){
              isbn
              title
            }
          }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then((res) => {
      return res.data.data.addBook;
    })
    .catch((err) => {
      return {
        error: err.response.data.errors[0].message || err.message,
      };
    });
};

const addBookAuthor = async (isbn, name) => {
  return await axios
    .post(
      "http://localhost:3000/graphql",
      {
        query: `
        mutation addBookAuthor($isbn: ID!, $name: String!){
          addAuthor(isbn: $isbn, author: {name: $name}){
            isbn
            authors{
              name
            }
          }
        }`,
        variables: {
          isbn: Number(isbn),
          name,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then((res) => {
      return res.data.data.addAuthor;
    })
    .catch((err) => {
      return {
        error: err.response.data.errors[0].message || err.message,
      };
    });
};

const unionAndInterface = async (
  num = 0,
  op = "unionTypes",
  key = "calculateValue"
) => {
  return await axios
    .post(
      "http://localhost:3000/graphql",
      {
        query: `
        query unionTypes ($input: Int!){
            calculateValue(num: $input){
                __typename
                ... on Some{
                  data
                }
                ... on None{
                  error
                }
              }
          }
          
          query interfaceTypes($input: Int!) {
            retrieveUser(num: $input){
              __typename
              ...on Admin {
                id
                name
                title
              }
              ...on Guest{
                id
                name
                token
              }
            }
          }`,
        variables: {
          input: Number(num),
        },
        operationName: op,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then((res) => {
      return res.data.data[key];
    })
    .catch((err) => {
      return { error: err.response.data.errors[0].message || err.message };
    });
};

const args = process.argv.slice(2);
console.log("args", args);

switch (args[0]) {
  case "getAllBooks": {
    getAllBooks().then((data) => console.log(JSON.stringify(data)));
    break;
  }
  case "addNewBook": {
    addNewBook().then((data) => console.log(JSON.stringify(data)));
    break;
  }
  case "addBookAuthor": {
    addBookAuthor(args[1], args[2]).then((data) =>
      console.log(JSON.stringify(data))
    );
    break;
  }
  case "unionAndInterface": {
    unionAndInterface(args[1], args[2], args[3]).then((data) =>
      console.log(JSON.stringify(data))
    );
    break;
  }
  default: {
    console.log("no matching function called");
    break;
  }
}
