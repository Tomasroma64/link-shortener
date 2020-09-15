const express = require('express');
const app = express();
const db = require('./db');
const code = require('./code')
const port = 3000;


const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// DB
app.get('/:linkCode', async(req, res) => {
    url = await db.getUrlFromCode(req.params.linkCode)
    try {
        res.redirect(url[0].url)
    } catch {
        res.redirect('/')
    }
})


// Temp
app.get('/home', (req, res) => res.sendFile(__dirname + '/public/home.html'))

app.post('/newLink', async(req, res) => {
    let newCode = code.generateCode()
    let redirectUrl = req.body.link;
    if (!redirectUrl.startsWith("http"))
        redirectUrl = "https://" + redirectUrl
    console.log({ redirectUrl })
    await db.addLink(newCode, redirectUrl)
    res.send({ shortLink: process.env.DOMAINNAME || ('http://localhost:' + port + '/') + newCode })
})

app.use(express.static(__dirname + '/public'));

app.get('/u/styles.css', async(req, res) => {
    res.sendFile(__dirname + '/public/styles.css')
});
app.get('/u/scripts.js', async(req, res) => {
    res.sendFile(__dirname + '/docs/scripts.js')
});



app.listen(port, () => console.log(process.env.DOMAINNAME || ('http://localhost:' + port)));