const typeorm = require('typeorm');
const User = require('./src/entities/User');

const connection = async () => {
  return await typeorm.createConnection({
    type: 'mysql',
    host: "localhost", 
    port: 3306, 
    username: "root",
    database: "teste_ioasys",
    synchronize: true,
    entities: [ User ],
  });
}

module.exports = connection;