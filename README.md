If I get the server in use error eaddinuse,

run ' killall -9 node '

# contact-keeper

an app to store contacts

So to create this contact keeper app, we will

1. Create a Database on Mongo DB Atlas - thats a whole thing into itself.

2. Create a new repo. And then give it a package json, so do

npm init -y

3. then we will install a few dependencies 6 in total

npm i express bcryptjs jsonwebtoken config express-validator mongoose

4. Next we will download some Dev Dependencies - nodemon (which will keep watch over our sever) and concurrently, which will allow us to run our front and back end concurrently

npm install -D nodemon concurrently

5. its important to note, all the steps here, these dependencies, etc are all for the backend, which will be out own API hosted on MongoDB

6. Now in our package JSON file, we will add a start script, our basic start script that will run on deployment and it will run node and the name of our starting file (which we haven't created yet) as well as a server script that will run nodemon and server.js

"scripts": {
"start": "node server.js",
"server": "nodemon server.js"
},

7. Now lets create a file server.js - this file is the entry point into our backend, it will bascilly be a very basic express server

const express = require('express'); // we will use common js syntax to bring in express (react itself uses import)

const app = express(); // we will initiailize express into a variable called app

const PORT = process.env.PORT || 5000; // variable for the port, we are setting it like this so it will look for an env variable first, and it not, it will use port 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // the app object will have a listen method and it will take in a port to listen in on. we will declare that above, and then we pass in that port

8. Now with that, run npm run server and it will start the server on Port 5000

9. Will
   // here we will add an endpoint route for testing purposes using a get request to the homepage with ('/')
   // and then it takes in a arrow function with a request and a response which will send a hello world

app.get('/', (req, res) => res.send('Hello World'));

save to update the server and you can confim in postman that request was sent

10. There are lots of things we can send, but for our purposes we will be sending res.json, to lets alter that code just a bit and have it return a more JSON'y object to us.

app.get('/', (req, res) => res.json({msg: 'Welcome to the ContactKeeper API'}));

and you can check in Postman to see we've recieved the JSON data back.

11. Now we will work on our backend routes, bascily endpoints our React application can hit to do certain things like register a user, login a user, create contact, update contacts, etc. Now to make it all a little easier to process we will make a seperate folder called Routes

12. We will have three route points so we'll make three route files
    auth.js - will have the login, the authentifcation, and a route to check the logged in user
    contacts.js - just crud functionalily, 'create, read, update, delete' (but each contact will be specific to a user so its more advanced)
    users.js - will have the register route

13. Now lets bring these files in server.js

// define routes - every backend route will start with /api
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

now at this point, the code won't work since we have nothing in those files.

14. So lets start with users.js to work on the functionality to register a user

// we will bring in express so we can use the route

const express = require('express');
// create a variable called router and set that to express.Router (with capital R)
const router = express.Router();
// now when we do our routes, we don't do app.post, we do route.post

// just to clarify, when you are making a get request, you are getting data. A post request is the opposite, you are giving data
// and put requests are to update data that is already there, and a delete request is obviously to delete.
// these are the 4 main methods in which we will be using
// so for registering a user, we will use a post request

// @route POST api/users
// @desc Register a user
// @access Public

// now for this we will just put '/' because we already defined that route to say /api/users in the server.js file
// so this router.post will also take in a req and a res, and a arrow function to a res.send
// and in that res.send, we'll send in a message to register a user
router.post('/', (req, res) => {
res.send('Register a user');
});

// now we have to export the router, otherwise it won't work

module.exports = router;

15. copy and that code and paste it into auth.js

Now auth.js will have two routes, one for getting the logged in user, and the other for actually logging in the user.

const express = require('express');
const router = express.Router();

// @route GET api/auth
// @desc Get logged in user
// @access Private

router.get('/', (req, res) => {
res.send('Get logged in user');
});

// @route POST api/auth
// @desc Auth user & get token
// @access Public

router.get('/', (req, res) => {
res.send('Register a user');
});

// even though these two routes have the same endpoint, they are different so its ok, ones a Get ones a Post

module.exports = router;

16. Now lets do that same and copy and paste into the contacts routes. Now contacts will have the most routes

const express = require('express');
const router = express.Router();

// @route GET api/contacts
// @desc Get all users contacts
// @access Private

router.get('/', (req, res) => {
res.send('Get all contacts');
});

// @route POST api/contacts
// @desc Add new contact
// @access Private

router.post('/', (req, res) => {
res.send('Add contact');
});

// put and delete routes will require an id to locate

// @route PUT api/contacts/:id
// @desc Update contact
// @access Private

router.put('/:id', (req, res) => {
res.send('Update contact');
});

// @route DELETE api/contacts/:id
// @desc Delete contact
// @access Private

router.delete('/:id', (req, res) => {
res.send('Delete contact');
});

module.exports = router;

17. Save and play around in postman to confirm it all works

http://localhost:5000/api/contacts/1

19. Now for the purposes of Github, since we haven't created the react portion yet, you need to create a seperate gitignore file to make sure it doens't pass up the node modules.

20. Now we will implement the data base connection , for this lets create a folder in the root of our application called config

21. In it will we make two files, the first is default.json where we will use it for global variables, this is the file where we will put in the link/string from MongoDB

22. So in the default.json, we will make a JSON object and paste in the mongoDB connection

{
"mongoURI": "mongodb+srv://rj123:<password>@cluster0.u9ykw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
}

but I have to add the user password I created earlier which for this one is rj123

21. Now in the config folder, we will create another config file for our database called db.js , its in this file we will use mongoose to connect to our database.

the file should have all this in it

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = () => {
mongoose
.connect(db, {
useNewUrlParser: true,
useCreateIndex: true,
useFindAndModify: false
})
.then(() => console.log('MongoDB Connected'))
.catch(err => {
console.error(err.message);
process.exit(1);
});
};

module.exports = connectDB;

22. Now we will bring these files into the server.js file
