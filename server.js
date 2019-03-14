const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'})
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const bodyParser = require('body-parser');



const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
  
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
}); 

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

const app = express();

//  Create GraphiQL application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}))

// Connect Schemas with GraphQL
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: {
    Recipe,
    User
  } 
}))

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => { 
  console.log(`server listening on PORT ${PORT}`)
})
