const { Client } = require("pg");

async function checkDBExistance() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  const res = await client.query("SELECT 1 FROM pg_database WHERE datname=$1", [
    "todoapp",
  ]);
  if (!res.rowCount) {
    await client.query("CREATE DATABASE todoapp");
  }
  await client.end();
}

module.exports = checkDBExistance;
