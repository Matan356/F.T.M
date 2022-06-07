import dotenv from "dotenv";
import express, { Request, Response } from "express";
dotenv.config();
import config from "config";
import responseTime from "response-time";
import connect from "./utils/connect";
import logger from "./utils/logger";
import { restResponseTimeHistogram, startMetricsServer } from "./utils/metrics";
import helmet from "helmet";
import deserializeUser from "./middleware/deserializeUser";
import router from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";

const port = config.get<number>("port");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: config.get("origin"),
    credentials: true,
  })
);

app.use(cookieParser());

/** Log the request */
app.use((req, res, next) => {
  /** Log the req */
  logger.info(
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    /** Log the res */
    logger.info(
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(deserializeUser);

app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);

// /** Rules of our API */
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );

//   if (req.method == "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }

//   next();
// });

// app.use((req, res, next) => {
//   const error = new Error("Not found");

//   res.status(404).json({
//     message: error.message,
//   });
// });

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();
  app.use(router);

  startMetricsServer();
});
