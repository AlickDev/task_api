// ../function/logger.js
module.exports = {
    appenders: {
      file: {
        type: 'file',
        filename: './system_log/app.log',
        maxLogSize: 10485760,
        backups: 5,
        compress: true
      },
      console: {
        type: 'console'
      }
    },
    categories: {
      default: {
        appenders: ['file', 'console'],
        level: 'debug'
      }
    }
  };
