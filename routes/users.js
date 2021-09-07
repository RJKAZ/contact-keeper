const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User.js');

router.post(
  '/',
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

// we will bring in express so we can use the route
// create a variable called router and set that to express.Router (with capital R)
// Bringing in the express validator check
// bring in the User.js schema
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

// now we have to export the router, otherwise it won't work
