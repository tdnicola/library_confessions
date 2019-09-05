var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    { Pool }  = require('pg'),
    app = express();

const {connectionString} = require('./config.json');

app.engine('dust', cons.dust);

app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const pool = new Pool({
    connectionString,
    ssl: true
});

app.get('/', ((req, res) => {
    pool.connect((err, client, done) => {
        if (err) throw err

        client.query('SELECT * FROM library', (err, result) => {
          if (err) {
            console.log(err.stack)
          } 
          res.render('index', {library: result.rows})
          done();
        })
      })
}))

app.post('/add', ((req, res) => {
  pool.connect((err, client, done) => {
    if (err) throw err

    client.query('insert into library(title, state, story) values($1, $2, $3)', 
      [req.body.title, req.body.state, req.body.story]);

      done();
      res.redirect('/')
    });
  })
);

app.delete('/delete', ((req, res) => {

}))

//listening
app.listen(process.env.PORT || 3000, (() => {
    console.log('Server connected')
})) 


