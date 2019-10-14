const {ApolloServer} = require('apollo-server');

const mongoose = require('mongoose');

require('dotenv').config({path: 'variables.env'});

const User = require('./models/User');
const Post = require('./models/Post');

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'typeDefs.graphql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        User,
        Post
    }
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});