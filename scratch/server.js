var express  = require('express');
var app      = express();
var Database = require('arangojs').Database;
var aqlQuery = require('arangojs').aqlQuery;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var db = new Database('http://127.0.0.1:8529');
db.useDatabase('NodeStore');
collection = db.collection('Nodes');



app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());


app.get('/api/nodes', function(req, res) {
    db.query(aqlQuery`
        FOR d IN ${collection} RETURN d
    `).then(
        cursor => cursor.map(doc => doc._key)
    ).then(
        keys =>  res.json(keys),
        err => console.error('Failed:', err)
    );
});

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

app.listen(8080);
console.log("App listening on port 8080");

