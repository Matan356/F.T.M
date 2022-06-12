import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
dotenv.config();
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
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

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );
  next();
});

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();

  app.use(router);
});
