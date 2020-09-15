const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.DB_URL;

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


module.exports = {
    addLink,
    getUrlFromCode
}

var linkSchema = new mongoose.Schema({
    code: 'string',
    url: 'string'
});
var links = mongoose.model('Link', linkSchema);


async function addLink(code, url) {


    var newLink = {
        code: code,
        url: url
    }

    links.collection.insertOne(newLink, function(err, docs) {
        if (err) return err;
        return true;
    })
}

async function getUrlFromCode(code) {

    //var query = Link.where({ code });
    console.log({ code })
    return links.find({ 'code': code }
        /*, function(err, data) {
                if (err) return handleError(err);
                if (data) {
                    console.log(data)
                }
            }*/
    ).exec();
}