const express = require('express');
const bodyParser = require('body-parser');
const volleyball = require('volleyball');
const path = require('path');


const app = express();

app.use(volleyball);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res, next) => {
    res.send('./public/index.html')
})

app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error, something went wrong in your file');
});

const PORT = 9999;
app.listen(process.env.PORT || 9999, () => {
    console.log(`Your app.listen is working, connection established on ${PORT}`);
});