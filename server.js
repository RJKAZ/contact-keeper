const express = require('express'); // we will use common js syntax to bring in express (react itself uses import)
const connectDB = require('./config/db'); // bringing in the connectDB

const app = express(); // we will initiailize express into a variable called app

// now to acctually connect the Database
connectDB();

// here we will add an endpoint route for testing purposes using a get request to the homepage with ('/')
// and then it takes in a arrow function with a request and a response which will send a hello world

app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to the ContactKeeper API' })
);

// define routes - every backend route will start with /api
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000; // variable for the port, we are setting it like this so it will look for an env variable first, and it not, it will use port 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // the app object will have a listen method and it will take in a port to listen in on. we will declare that above, and then we pass in that port
