const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.static('files'));

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.listen(3000);
