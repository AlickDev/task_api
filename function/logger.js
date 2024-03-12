module.exports = {
  appenders: {
    file: {
      type: "file",
      filename: "./system_log/app.log",
      maxLogSize: 10485760,
      backups: 5,
      compress: true,
    },
    userActivity: {
      type: "file",
      filename: "./system_log/user_activity_log/user_activity.log",
      maxLogSize: 10485760,
      backups: 5,
      compress: true,
    },
    AuthenticationLog:{
      type: "file",
      filename: "./system_log/AuthenticationLog/Authentication_Log.log",
      maxLogSize: 10485760,
      backups: 5,
      compress: true,
    },

    console: {
      type: "console",
    },
  },
  categories: {
    default: {
      appenders: ["file", "console"],
      level: "debug",
    },
    userActivity:{
      appenders:['userActivity'],
      level:'info'
    },
    AuthenticationLog:{
      appenders:['AuthenticationLog'],
      level:'info'
    }
  },
};
