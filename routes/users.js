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
