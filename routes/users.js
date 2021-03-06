var express = require('express');
var router = express.Router();

const pool = require("../db");
const { encryptPass, checkPass } = require("../helpers/helpers");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let query = await pool.query('SELECT * FROM users')
  
  res.render('users_list', {query});
});

router.post('/login', async function(req, res, next) {
  const { email, password } = req.body;

  let queryUser = await pool.query('SELECT * FROM users WHERE email=?', [email])

  if(checkPass(queryUser[0].password, password)) {
    let query = await pool.query('SELECT * FROM users')
    res.render('users_list', {query});
  }
})

router.get('/add', function(req, res, next) {
  res.render('users_add')
})

router.post('/add', function(req, res, next) {

  const { name, lastname, password, email } = req.body;

  let newPass = encryptPass(password);

  const newUser = {
    name,
    lastname,
    password:newPass,
    email,
  };

  pool.query("INSERT INTO users SET ? ", [newUser]);

  console.log(newUser);
  console.log(req.body)
  res.redirect('/users')
})

router.get('/edit/:id', async function(req, res, next) {
  const { id } = req.params;

  let query = await pool.query('SELECT * FROM users WHERE id=?', [id])
  
  res.render('users_edit', query[0]);
})

router.post('/edit/:id', function(req, res, next) {
  const { name, lastname, password, email } = req.body;
  const { id } = req.params;

  let newPass = encryptPass(password);

  const newUser = {
    name,
    lastname,
    password:newPass,
    email,
  };

  // newUser.password = encryptPass(password);

  pool.query("UPDATE users SET ? WHERE id=?", [newUser, id]);

  res.redirect('/users')
})

router.get('/delete/:id', function(req, res, next) {
  const { id } = req.params;
  pool.query("DELETE FROM users WHERE id=?", [id])
  res.redirect('/users')
})


module.exports = router;
