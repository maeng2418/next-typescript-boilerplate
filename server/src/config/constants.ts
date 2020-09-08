export const paramMissingError = 'One or more of the required parameters was missing.';
export const parserLimit = 5000000;
export const jwtSecret = process.env.JWT_SECRET || 'secret';
export const tokenExpire = '2h';
export const apiEndPoint = process.env.API_END_POINT || 'http://localhost';
export const migrate = process.env.MIGRATE === 'true' ? true : false;

export const databaseConfig = {
  database: process.env.DB_NAME as string,
  username: process.env.DB_USER as string,
  password: process.env.DB_PW as string,
  host: process.env.DB_HOST as string,
};
