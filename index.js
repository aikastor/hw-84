const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const controllers = require('./controllers');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

const run = async () => {
  await mongoose.connect('mongodb://localhost/tasks', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
  });
  app.use('/', controllers);
  app.listen(port, ()=> {
      console.log(`HTTP Server started on ${port} port!`);
  })
};
run().catch(e => {
    console.error(e);
});