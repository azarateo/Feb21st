const express = require('express')
const axios = require('axios')
app = express()
app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', function (req, res) {
    res.render('home')
})

app.get('/characters/', function () {
    const getCharacters = async () => {
        try {
            const res = await axios.get("https://swapi.dev/people")
            const characters = res.data
            console.log(characters)
        } catch (error) {
            console.log(error)
        }
    }
    getCharacters()
    res.render('characters')
})

app.listen(3000, () => {
    console.log("Server started on port 3000.")
})