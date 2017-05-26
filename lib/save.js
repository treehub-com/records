const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DATABASE || 'records',
});

function save(collection) {
  return new Promise((resolve, reject) => {
    // Only save values that are defined
    const fields = Object.keys(collection).filter((val) => collection[val] !== undefined);
    const placeholders = Array(fields.length).fill('?');
    const statement = `
      INSERT INTO collections (
        ${fields.join(',')}
      ) VALUES (
        ${placeholders.join(',')}
      ) ON DUPLICATE KEY UPDATE
       ${fields.map((val) => `${val} = ?`).join(',')}
    `;

    const values = [];
    for (const field of fields) {
      values.push(collection[field]);
    }

    connection.query(statement, values.concat(values), (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

module.exports = async function(collections) {
  connection.connect();

  for (const collection of collections) {
    try {
      await save(collection);
    } catch (error) {
      console.error(error);
    }
  }

  connection.end();
};
