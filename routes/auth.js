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

router.post('/', (req, res) => {
  res.send('Register a user');
});

// even though these two routes have the same endpoint, they are different so its ok, ones a Get ones a Post

module.exports = router;
