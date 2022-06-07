import express from "express";
import client from "prom-client";
import log from "./logger";

const app = express();

//Custom Metrics 
// Histograms track sizes and frequency of events
export const restResponseTimeHistogram = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "REST API response time in seconds",
  labelNames: ["method", "route", "status_code"],
});

export const databaseResponseTimeHistogram = new client.Histogram({
  name: "db_response_time_duration_seconds",
  help: "Database response time in seconds",
  labelNames: ["operation", "success"],
});


export function startMetricsServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics(); // Default metrics are collected 

  app.get("/metrics", async (req, res) => { // route of metrics
    res.set("Content-Type", client.register.contentType); // added header strings to result

    return res.send(await client.register.metrics()); // send after geting all metrics
  });

  app.listen(9100, () => {
    log.info("Metrics server started at http://localhost:9100/metrics");
  });
}
