const mongoose = require('mongoose');

mongoose
  .connect(`mongodb://localhost:27017/${process.env.DEV_DB}`)
  .then(() => {
    console.log('DB connected');
  })
  .catch(err => {
    console.log(err);
  });

module.exports = mongoose;
