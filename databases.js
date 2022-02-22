module.exports = {

    db_dev: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'examen_db'
    },

    db_prod: {
        host: process.env.HOST_DB,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
}