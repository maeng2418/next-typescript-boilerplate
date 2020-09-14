import dotenv from 'dotenv';
import path from 'path';
import commandLineArgs from 'command-line-args';
import logger from '@config/Logger';

// Setup command line options
const options = commandLineArgs([
  {
    name: 'testFile',
    alias: 'f',
    type: String,
  },
]);

// Set the env file
const result2 = dotenv.config({
  path: path.join(__dirname, `../../shared/env/test.env`),
});
if (result2.error) {
  throw result2.error;
}

// Init Jasmine
const jasmine = new Jasmine(null);

// Set location of test files
jasmine.loadConfig({
  random: true,
  spec_dir: 'spec',
  spec_files: ['./**/*.spec.ts'],
  stopSpecOnExpectationFailure: false,
});

// On complete callback function
jasmine.onComplete((passed: boolean) => {
  if (passed) {
    logger.info('All tests have passed :)');
  } else {
    logger.error('At least one test has failed :(');
  }
});
