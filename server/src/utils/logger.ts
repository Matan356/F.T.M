import winston, { format } from "winston";
const { combine, timestamp, printf } = format;

const myformat = format.combine(
  format.colorize({ all: true }),
  format.timestamp(),
  format.align(),
  printf(
    ({ level, message, timestamp }) => `[${timestamp} ] ${level}: ${message}`
  )
);
const logger = winston.createLogger({
  format: combine(timestamp(), format.simple()),
  transports: [
    new winston.transports.Console({ format: myformat }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/warn.log", level: "warn" }),
    new winston.transports.File({ filename: "logs/info.log", level: "info" }),
  ],
});


export default logger;
