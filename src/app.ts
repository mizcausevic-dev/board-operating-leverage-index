import express from "express";
import {
  renderDocs,
  renderLeverageIndex,
  renderOverview,
  renderDragPockets,
  renderScalingMotions,
  renderVerification
} from "./services/render.js";
import {
  leverageIndex,
  scalingMotions,
  payload,
  dragPockets,
  riskMap,
  summary,
  verification
} from "./services/verticalBriefService.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/leverage-index", (_req, res) => res.type("html").send(renderLeverageIndex()));
  app.get("/drag-pockets", (_req, res) => res.type("html").send(renderDragPockets()));
  app.get("/scaling-motions", (_req, res) => res.type("html").send(renderScalingMotions()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/leverage-index", (_req, res) => res.json(leverageIndex()));
  app.get("/api/drag-pockets", (_req, res) => res.json(dragPockets()));
  app.get("/api/scaling-motions", (_req, res) => res.json(scalingMotions()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

const port = Number(process.env.PORT || 4010);

if (process.env.NODE_ENV !== "test") {
  createApp().listen(port, () => {
    console.log(`board-operating-leverage-index listening on http://127.0.0.1:${port}`);
  });
}
