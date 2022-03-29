const pinoHttp = require('pino-http');
const { logger } = require('../utils/logger');

const expressLogger = pinoHttp({
  logger,
  customLogLevel(res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } if (res.statusCode >= 500 || err) {
      return 'error';
    } if (res.statusCode >= 300 && res.statusCode < 400) {
      return 'silent';
    }
    return 'info';
  },
  customSuccessMessage(res) {
    if (res.statusCode === 404) {
      return 'resource not found';
    }
    return 'request completed';
  },
  customReceivedMessage(req) {
    return `request received: ${req.method}`;
  },
  customErrorMessage(error, res) {
    return `request errored with status code: ${res.statusCode}`;
  },
  customAttributeKeys: {
    req: 'request',
    res: 'response',
    err: 'error',
    responseTime: 'timeTaken',
  },
});

module.exports = expressLogger;
