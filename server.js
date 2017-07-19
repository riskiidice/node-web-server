const express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    // res.send('Hello Express');
    res.send({
        name: 'Tikumporn',
        likes: ['Dogs', 'cats']
    })
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage : 'Unable to handle request'
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});