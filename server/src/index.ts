import './load-env'; // Must be the first import
import app from 'src/server';
import logger from '@config/logger';

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  logger.info('Express server started on port: ' + port);
});
