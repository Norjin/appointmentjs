const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const path = require('path');
const http = require('http');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/'));

// routes(app);

app.use('/api', routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

let server = http.createServer(app);

server.listen(3000, function() {
    console.log("app running on port ", server.address().port )
});
