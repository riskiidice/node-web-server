const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const axios = require('axios');

const port = process.env.PORT || 3000;

var app = express();
var bodyParser = require('body-parser');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}  ${req.url} ${req.ip}`;

    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/* app.use((req, res, next)=> {
    res.render('maintenance.hbs');
});
 */
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.post('/webhook', (req, res) => {
    var body = req.body;


     var instance = axios.create({
        baseURL: "",
        headers: { 'Authorization': 'Bearer NDVkNDUxMGUtNDc3ZC00YTM1LWEzMWYtZmNkMjkwMjU3ZDUyYzU5ZTcwNjMtZGVl' }
    });

    var sparkKeys = {
        roomId: "Y2lzY29zcGFyazovL3VzL1JPT00vZTM3YzE1NjAtNmRjZS0xMWU3LWI2OWItMDk4ODQzNWEzOGRk",
        text: body.text
    };

    axios({
        method : 'post',
        url: 'https://api.ciscospark.com/v1/messages',
        headers: { 'Authorization': 'Bearer NDVkNDUxMGUtNDc3ZC00YTM1LWEzMWYtZmNkMjkwMjU3ZDUyYzU5ZTcwNjMtZGVl' },
        data : sparkKeys
    })
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        }); 
 

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

