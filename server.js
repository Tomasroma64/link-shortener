const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// DB
app.get('/:linkCode', (req, res) => res.redirect("https://www.google.com/" + req.params.linkCode))


// Temp
app.get('/home', (req, res) => res.sendFile(__dirname + '/public/home.html'))

app.use(express.static(__dirname + "/public"));

app.get('/u/styles.css', async(req, res) => {
    res.sendFile(__dirname + "/public/styles.css")
});
app.get('/u/scripts.js', async(req, res) => {
    res.sendFile(__dirname + "/docs/scripts.js")
});




const port = 3000;
app.listen(port, () => console.log(process.env.DOMAINNAME || ('http://localhost:' + port)));