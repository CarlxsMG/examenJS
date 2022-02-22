module.exports = {

    database_des: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mycars'
    },

    database_prod: {
        host: process.env.HOST_DB,
        user: process.env.USER_DB,
        password: process.env.PASSW_DB,
        database: process.env.NAME_DB
    }
}