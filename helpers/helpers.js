const bcrypt = require("bcryptjs");

const encriptarPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

module.exports = {
  encriptarPassword,
};
