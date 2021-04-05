const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(morgan("dev"));
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
