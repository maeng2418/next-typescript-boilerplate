import database from './database';
import logger from '@config/logger';
import { databaseConfig } from '@config/constants';

const dbService = (migrate: boolean) => {
  const authenticateDB = () => database.authenticate();

  const dropDB = () => database.drop();

  const syncDB = () => database.sync();

  const successfulDBStart = () =>
    logger.info(
      `connection to the database has been established successfully: ${databaseConfig.host}(${process.env})`
    );

  const successfulMigrate = () =>
    logger.info(`success migrating category, sub_category, product(fruit, vegetable), and Admin`);

  const errorDBStart = (err: Error) =>
    logger.info(`unable to connect to the database: ${databaseConfig.host}(${process.env})`);

  // 기존의 DB 사용
  const startMigrateTrue = async () => {
    try {
      await syncDB();
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
      throw err;
    }
  };

  // DB 초기화
  const startMigrateFalse = async () => {
    try {
      await dropDB();
      await syncDB();
      successfulDBStart();
      successfulMigrate();
    } catch (err) {
      errorDBStart(err);
      throw err;
    }
  };

  const start = async () => {
    try {
      await authenticateDB();
      logger.info(`DB migrate: ${migrate}`);
      if (migrate) {
        return startMigrateTrue();
      }
      return startMigrateFalse();
    } catch (err) {
      return errorDBStart(err);
    }
  };

  return {
    start,
  };
};

export default dbService;
