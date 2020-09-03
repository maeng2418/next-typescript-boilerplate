export const paramMissingError = 'One or more of the required parameters was missing.';
export const parserLimit = 5000000;

export const databaseConfig = {
  database: process.env.DB_NAME as string,
  username: process.env.DB_USER as string,
  password: process.env.DB_PW as string,
  host: process.env.DB_HOST as string,
};
