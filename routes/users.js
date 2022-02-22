var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users_list');
});

router.get('/add', function(req, res, next) {
  res.render('users_add')
})

router.post('/add', function(req, res, next) {
  console.log(req.body)
  res.redirect('/users')
})

router.post('/delete/:id', function(req, res, next) {
  res.redirect('/users')
})

module.exports = router;
