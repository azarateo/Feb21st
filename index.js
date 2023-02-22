const express = require('express')
app = express()
app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', function (req, res) {
    res.render('home')
})

app.listen(3000, () => {
    console.log("Server started on port 3000.")
})