const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/Task');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  const user = req.user;
  const task = req.body;

  try {

    task.user = user._id;
    const taskToAdd = new Task(task);
    await taskToAdd.save();
    return res.status(200).send(taskToAdd);

  }catch (error) {
    return res.status(400).send({error});
  }
});

router.get('/', authMiddleware, async (req,res) => {
  const user= req.user._id;

  try {
    const tasks = await Task.find({user});
    return res.status(200).send(tasks);
  } catch (error) {
    return res.status(400).send({error});
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const user = req.user._id;
  const _id = req.params.id;
  const editedTask = req.body;

  try {
    Task.findOneAndUpdate({user, _id }, editedTask,{ runValidators: true }, function(err, doc) {
      if(err)
        return res.status(404).send({err});
      else
        return res.status(200).send('Task edited');
    })
  } catch (error) {
    res.status(404).send({error})
  }
});

router.delete('/:id', authMiddleware, async(req, res) => {
  const user = req.user._id;
  const _id = req.params.id;

  Task.findOneAndDelete({user, _id }, function (error, doc) {

    if (error) {
      res.status(404).send({error})
    } else {
      res.status(200).send('Task deleted!')
    }
  })
});

module.exports = router;