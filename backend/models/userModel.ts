import { Pool } from 'pg';

const pool = new Pool({
  user: "postgres",
  password: "mysecretpassword",
  host: "postgresdb",
  port: "5432",
  database: "git_docked_db",
})

console.log('connected to database');

const query = (
  text: string,
  params?: any[],
  callback?: (err: Error, result: any) => void
): Promise<any> => {
  console.log('Executed GitDocked query: ', text);
  return pool.query(text, params, callback);
};

export { query };