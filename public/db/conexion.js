const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'bifpzye8htelw5igisds-mysql.services.clever-cloud.com',
    user: 'u3tyry5uu5ame6kc',
    password: 'MHrn3ivySVNsetQU7jgy',
    database: "bifpzye8htelw5igisds"
});

pool.getConnection( (err,conn) => {
    if(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DB connection was closed');
        }
        if(err.code === 'ER_CON_COUNT ERROR'){
            console.error('DB has too many connections.');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DB connection refused');
        }
    }
    if(conn) 
        conn.release();
    return;
});

pool.query = util.promisify(pool.query);
module.exports = pool;