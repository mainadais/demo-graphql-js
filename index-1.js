const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const rootValue = require("./src/basic/resolvers");
const schema = require("./src/basic/schema");
const port = 3000;

const loggingMiddleware = (req, res, next) => {
  console.log("ip:", req.ip);
  next();
};

const app = express();
app.use(loggingMiddleware);
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    context: { startTime: Date.now() },
  })
);

app.listen(port, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`
  );
});
