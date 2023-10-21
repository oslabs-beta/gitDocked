import { Pool } from 'pg';

const pool = new Pool({
  user: "postgres",
  password: "mysecretpassword",
  host: "postgresdb",
  port: "5432",
  database: "git_docked_db",
});

pool.on("connect", () => {
  console.log("connected to the db")
});

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack);
});

const query = (
  text: string,
  values?: any[],
  callback?: (err: Error, result: any) => void
): Promise<any> => {
  console.log('Executed GitDocked query: ', text);
  return pool.query(text, values, callback);
};

export { query };