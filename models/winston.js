const winston = require("winston");

const updateSuccessLog = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "/Users/matheusjiran/Adhere/logs/updateSuccessLog.log",
      level: "info",
    }),
  ],
});

const updateErrorLog = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "/Users/matheusjiran/Adhere/logs/updateErrorLog.log",
      level: "error",
    }),
  ],
});

const createSuccessLog = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "/Users/matheusjiran/Adhere/logs/createSuccessLog.log",
      level: "info",
    }),
  ],
});

const createErrorLog = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "/Users/matheusjiran/Adhere/logs/createErrorLog.log",
      level: "error",
    }),
  ],
});

const deleteSuccessLog = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "/Users/matheusjiran/Adhere/logs/deleteSuccessLog.log",
      level: "info",
    }),
  ],
});

const deleteErrorLog = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "/Users/matheusjiran/Adhere/logs/deleteErrorLog.log",
      level: "error",
    }),
  ],
});

module.exports = {
  updateSuccessLog,
  updateErrorLog,
  createSuccessLog,
  createErrorLog,
  deleteSuccessLog,
  deleteErrorLog
};
