var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_claiched',
  password        : '4471',
  database        : 'cs340_claiched'
});

module.exports.pool = pool;
