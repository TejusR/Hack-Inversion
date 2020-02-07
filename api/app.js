const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
var routes = require('./Routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(
    cors({
        credentials: true
    })
);
app.use(routes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});
