const { connectToDatabase } = require('../config/database');

describe('Database Connection', () => {
  it('should connect to the MySQL database successfully', async () => {
    const connection = await connectToDatabase();
    expect(connection).toBeDefined();
    expect(connection.config.database).toBe('stocks');

    // Close the connection after test
    await connection.end();
  });

  it('should throw an error for wrong credentials', async () => {
    // Override temporarily with wrong config
    const mysql = require('mysql2/promise');

    const wrongConnect = async () => {
      await mysql.createConnection({
        host: 'localhost',
        user: 'wrong_user',
        password: 'wrong_password',
        database: 'stocks',
      });
    };

    await expect(wrongConnect()).rejects.toThrow();
  });
});
