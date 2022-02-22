var express = require("express");
var router = express.Router();

const pool = require("../database");
const { encriptarPassword } = require("../helpers/helpers");

// LISTAR USUARIOS
router.get("/", async function (req, res, next) {
  const usuarios = await pool.query("SELECT * FROM users");

  res.render("listUsers", { usuarios });
});

// AÑADIR USUARIOS
router.get("/add", function (req, res, next) {
  res.render("addUser");
});

router.post("/add", async function (req, res, next) {
  const { username, fullname, password, email } = req.body;

  const newUser = {
    username,
    fullname,
    password,
    email,
  };

  newUser.password = encriptarPassword(password);

  pool.query("INSERT INTO users SET ? ", [newUser]);

  console.log(newUser);

  res.redirect("/users");
});

// BORRAR USUARIOS
router.get("/deleteUser/:id", async function (req, res, next) {
  const { id } = req.params;

  await pool.query("DELETE FROM users WHERE id = ?", [id]);

  res.redirect("/users");
});

// EDITAR USUARIOS
router.get("/editUser/:id", async function (req, res, next) {
  const { id } = req.params;

  const usuario = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

  res.render("editUser", usuario[0]);
});

router.post("/editUser/:id", async function (req, res, next) {
  const { id } = req.params;
  const { username, fullname, password, email } = req.body;

  const newUser = {
    username,
    fullname,
    password,
    email,
  };

  newUser.password = encriptarPassword(password);

  await pool.query("UPDATE users SET ? WHERE id=? ", [newUser, id]);

  console.log(newUser);

  res.redirect("/users");
});

module.exports = router;
