const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const resolvers = require("./src/tools/resolvers");
const typeDefs = require("./src/tools/schema");
const schema = makeExecutableSchema({ typeDefs, resolvers });
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
    context: { startTime: Date.now() },
  })
);

app.listen(port, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`
  );
});
