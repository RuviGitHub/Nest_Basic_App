import logger from '../utils/logger.utils.js';

const httpLogger = (req, res, next) => {
  logger.info({ message: `HTTP Request - ${req.method} ${req.url}` });

  console.log(`🌐 HTTP ${req.method} ${req.url}`);
  next();
};

export default httpLogger;