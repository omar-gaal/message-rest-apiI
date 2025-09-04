import fs from "fs/promises";
import { randomUUID } from "crypto";

import express, { json } from "express";
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Node.js Messages REST API 🚀 UPDATED!");
});

app.get("/test-read", (req, res) => {
  const data = fs.readFile("/data/messages.json", "utf8");
  const messages = JSON.parse(data);
  res.send(messages);
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
