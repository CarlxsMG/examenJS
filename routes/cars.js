var express = require("express");
var router = express.Router();

const pool = require("../database");

// LISTAR USUARIOS
router.get("/", async function (req, res, next) {
  const coches = await pool.query("SELECT * FROM cars");

  res.render("listCars", { coches });
});

// AÑADIR USUARIOS
router.get("/add", function (req, res, next) {
  res.render("addCar");
});

router.post("/add", async function (req, res, next) {
  const { marca, modelo, potencia } = req.body;

  const newCar = {
    marca,
    modelo,
    potencia
  };

  await pool.query("INSERT INTO cars SET ? ", [newCar]);

  console.log(newCar);

  res.redirect("/cars");
});

// BORRAR USUARIOS
router.get("/deleteCar/:id", async function (req, res, next) {
  const { id } = req.params;

  await pool.query("DELETE FROM cars WHERE id = ?", [id]);

  res.redirect("/cars");
});

// EDITAR USUARIOS
router.get("/editCar/:id", async function (req, res, next) {
  const { id } = req.params;

  const usuario = await pool.query("SELECT * FROM cars WHERE id = ?", [id]);

  res.render("editCar", usuario[0]);
});

router.post("/editCar/:id", async function (req, res, next) {
  const { id } = req.params;
  const { marca, modelo, potencia } = req.body;

  const newCar = {
    marca,
    modelo,
    potencia
  };

  await pool.query("UPDATE cars SET ? WHERE id=? ", [newCar, id]);

  console.log(newCar);

  res.redirect("/cars");
});

// RUTA PARA API
router.get("/api", async function (req, res, next) {

  const cars = await pool.query("SELECT * FROM cars")

  res.json({
    "Lista coches":cars
  })
});

module.exports = router;
