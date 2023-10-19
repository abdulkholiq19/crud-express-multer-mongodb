const express = require('express')
const mongoose = require("mongoose");
const dotenv = require('dotenv');
var cors = require('cors');

// Get routes to the variabel
const router = require("./src/routes");

const app = express()
const port = 8001

app.use(cors())
app.use(express.json());

dotenv.config();

mongoose.set("strictQuery", false)
mongoose.
  connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.DATABASE_CLUSTER}.wchnljq.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log('connected to MongoDB')
    app.listen(port, () => {
      console.log(`Node API app is running on port ${port}`)
    });
  }).catch((error) => {
    console.log(error)
  })

// Add endpoint grouping and router
app.use("/api", router);
app.use("/uploads", express.static("uploads"));