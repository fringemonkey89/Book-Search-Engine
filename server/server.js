const express = require('express');
const path = require('path');
const db = require('./config/connection');
//const routes = require('./routes');
const { authMiddleware} = require('./utils/auth')

// import ApolloServer
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require

// create new apollo servers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
})
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app })
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
}
startApolloServer(typeDefs, resolvers)