const express = require('express');
const bcrypt = require('bcrypt');

const Users = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  const user = new Users(req.body);

  try {
    await user.save();
    return res.send(user);

  } catch (error) {
    return res.status(400).send({error});
  }
});

router.post('/sessions', async (req, res)=> {
  const user = await Users.findOne({username: req.body.username});

  if(!user) {
    return res.status(400).send({error: 'Username not found!'})
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if(!isMatch)
    return res.status(400).send({error: 'Password is incorrect!'});

  user.generateToken();

  await user.save();

  return res.send({token: user.token});
});

module.exports = router;
