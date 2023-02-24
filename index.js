// Creating variables that imports express and axios to make them available in this app
const express = require('express')
const axios = require('axios')
// Creating the object express and assigning it to the variable app so I can use express to instantiate the server
app = express()
// 
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
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the response');
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000.")
})