const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose')
const mdburi = "mongodb+srv://azarate:MongoDBPassword123@cluster0.hawtso5.mongodb.net/?retryWrites=true&w=majority"
app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
const apiUrl = 'https://swapi.dev/api/people/';
app.get('/', function (req, res) {
    res.render('home')
})

app.get('/characters', async (req, res) => {
    try {
      const response = await axios.get(apiUrl);
      res.render('characters', { response: response.data });
      mongoose.set('strictQuery', true);
      const connection = await mongoose.connect(mdburi);
      console.log("connected to MongoDB")

    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching the response');
    }
  });

app.listen(3000, () => {
    console.log("Server started on port 3000.")
})