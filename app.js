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
        if (err) throw err;

        client.query('SELECT * FROM library order by id', (err, result) => {
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
    if (err) throw err;

    client.query('insert into library(title, state, story, likes) values($1, $2, $3, $4)', 
      [req.body.title, req.body.state, req.body.story, 1]);

      done();
      res.redirect('/')
    });
  })
);

app.delete('/delete/:id', ((req, res) => {
    pool.connect((err, client, done) => {
      if (err) throw err;

      client.query('delete from library where id = $1', 
        [req.params.id]);

        done();
        res.sendStatus(200);
      });
}));

app.post('/edit', ((req, res) => {
  pool.connect((err, client, done) => {
    if (err) throw err;

    client.query('update library set story = $1, state = $2, title = $3 where id = $4', 
      [ req.body.story, req.body.state, req.body.title, req.body.id ]);

      done();
      res.redirect('/');
    });

}))

app.post('/:likes/:id', ((req, res) => {
  pool.connect((err, client, done) => {
    if (err) throw err;

    client.query('update library set likes = $1 where id = $2', 
      [ req.params.likes, req.params.id ]);

      done();
      // res.redirect('/');
    });

}))

//listening
app.listen(process.env.PORT || 3000, (() => {
    console.log('Server connected')
}));


