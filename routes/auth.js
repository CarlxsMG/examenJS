var express = require("express");
var router = express.Router();

const jwt = require("jsonwebtoken");
const pool = require("../database");

// LISTAR USUARIOS
router.get("/", async function (req, res, next) {
  res.redirect("/users");
});

// OBTENER TOKEN EN WEB
router.get("/login/:id", async function (req, res, next) {
  const { id } = req.params;

  const usuario = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

  const token = jwt.sign(id, "secret");

  res.render("token", { token: token, usuario: usuario[0] });
});

// PETICION PARA API
router.get("/api", async function (req, res, next) {
  const token = req.header("token");

  jwt.verify(token, "secret", (err, data) => {
    if (!token) {
      console.log(err)
      return res.status(401).json({
        msg: "No hay token de validación!!",
      });
    } else {
      res.json({ msg: "El id del usuario es: " + data });
    }
  });
});
module.exports = router;
