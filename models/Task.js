const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  user: {
    type:  Schema.Types.ObjectID,
    ref: 'User',
    required: true,
    immutable: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'complete'],
    required: 'true',
    default: 'new'
  }
});
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;