var express = require('express');
var router = express.Router();

const pool = require("../db");

/* GET users listing. */

router.get('/api', async function(req, res, next) {
    let query = await pool.query('SELECT * FROM cars')
    console.log(query)

    res.json(query)
})

router.get('/', async function(req, res, next) {
    let query = await pool.query('SELECT * FROM cars')
    
    res.render('car_list', {query});
  });
  
  router.get('/add', function(req, res, next) {
    res.render('car_add')
  })
  
  router.post('/add', function(req, res, next) {
  
    const { marca, modelo, potencia, foto } = req.body;
  
    const newCar = {
      marca,
      modelo,
      potencia,
      foto
    };
  
    // newUser.password = encryptPass(password);
  
    pool.query("INSERT INTO cars SET ? ", [newCar]);
  
    console.log(newCar);
    console.log(req.body)
    res.redirect('/cars')
  })
  
  router.get('/edit/:id', async function(req, res, next) {
    const { id } = req.params;
  
    let query = await pool.query('SELECT * FROM cars WHERE id=?', [id])
    
    res.render('car_edit', query[0]);
  })
  
  router.post('/edit/:id', function(req, res, next) {
    const { id } = req.params;
  
    const { marca, modelo, potencia, foto } = req.body;
  
    const newCar = {
      marca,
      modelo,
      potencia,
      foto,
    };
  
    // newUser.password = encryptPass(password);
  
    pool.query("UPDATE cars SET ? WHERE id=?", [newCar, id]);
  
    res.redirect('/cars')
  })
  
  router.get('/delete/:id', function(req, res, next) {
    const { id } = req.params;
    pool.query("DELETE FROM cars WHERE id=?", [id])
    res.redirect('/cars')
  })

module.exports = router;
