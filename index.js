// Creating variables that imports express and axios to make them available in this app
const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose')
const mdburi = "mongodb+srv://webdev:Bnds2023@cluster0.ymqk5yl.mongodb.net/?retryWrites=true&w=majority"
app = express()
// 

const characterSchema = new mongoose.Schema(
    {
        name: String,
        height: String,
        mass: String
    }
)
const Character = mongoose.model('Character', characterSchema)

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
        n = 0
        for (const character of response.data.results) {
            console.log(character)
            const record = new Character({
                name: character.name,
                height: character.height,
                mass: character.mass
            })
            n += 1
            console.log("Attempting to save record ", n)
            await record.save()
            console.log("Record number ", n, " saved")
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the response');
    }
});

app.get('/charactersMongoDB', async (req, res) => {
    try {
        console.log("Attempting to find characters in MongoDB")
        const connection = await mongoose.connect(mdburi);
        console.log("connected to MongoDB")
        const charactersMongoDB = await Character.find()
        console.log("Characters found")
        console.log(charactersMongoDB)
        res.render('charactersMongoDB', { charactersMongoDB })
    } catch (error) {
        console.log(error)
    }

})

app.listen(3000, function () {
    console.log("Running on port 3000.")
})