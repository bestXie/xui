/**
 * Created by wlh on 16/8/14.
 */
'use strict';


const mysql = require("mysql");
const C = require("./config");
let pool  = mysql.createPool(C.mysql);

function getConnection() {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) return reject(err);
      resolve(connection);
    });
  })
}

exports.query = function (sql) {
  if (process.env['NODE_ENV'] == 'test') {
    console.log(`执行sql语句:${sql}`)
  }
  return getConnection()
    .then( (conn) => {
      return new Promise((resolve, reject) => {
        conn.query(sql, function(err, rows) {
          conn.release();
          if (err) return reject(err);
          resolve(rows);
        })
      })
    })
}