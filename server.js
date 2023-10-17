const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const cors = require('cors');
const app = express();
const knex = require('knex');

const register = require('./controllers/register'); 
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'localhost',
    port : 5432,
    user : 'postgres',
    password : 'Datanode808',
    database : 'smart-brain'
  }
});

db.select('*').from('users');

app.use(bodyParser.json());
app.use(cors());
const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'john@gmail.com'
    }
  ]
}

app.get('/', (req, res)=> {
  res.send('Success');
})

app.post('/Signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/Register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db, bcrypt)})

app.post('/image', (req, res) => { image.handleImage(req, res, db)})




app.listen(3001, () => { // you are running server on port 3001
  console.log('app is running on port 3000'); // <== here you're logging that you are running on port 3000
})
