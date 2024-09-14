require('dotenv').config();
const express = require("express");
const App = express();
App.use(express.json());
const mongoose = require("mongoose");
const authroute = require('./routes/authroute');

const productroutes = require('./routes/productroutes');
App.use('/products' , productroutes);

App.use('/auth' , authroute);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    App.listen(process.env.PORT, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`DB is connected & your server is listening on http://localhost:${process.env.PORT}`);
      }
    });
})
  .catch((err) => {
    console.log("error connecting to DB", err);
});
