// 7,2

import express from "express";
import fs from "fs/promises";
import { randomUUID } from "crypto";

import cors from "cors";

async function readMessages() {
  const data = await fs.readFile("data/messages.json", "utf8");
  return JSON.parse(data);
}

async function writeMessage(messages) {
  await fs.writeFile("data/messages.json", JSON.stringify(messages, null, 2));
}

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Node.js Messages REST API 🚀 UPDATED!");
});

app.get("/test-read", async (req, res) => {
  const messages = await readMessages();
  res.json(messages);
});

app.get("/test-write", async (req, res) => {
  // const data = await fs.readFile("data/messages.json", "utf8");
  // const messages = JSON.parse(data);
  const messages = await readMessages();

  const newMessage = {
    id: randomUUID(),
    date: new Date().toISOString(),
    text: "Test besked fra serveren!",
    sender: "server",
  };

  messages.push(newMessage);
  await writeMessage(messages);
  // await fs.writeFile("data/messages.json", JSON.stringify(messages, null, 2));
  res.json(newMessage);
});

app.get("/messages", async (req, res) => {
  const messages = await readMessages();
  res.json(messages);
});

app.get("/messages/:id", async (req, res) => {
  const messages = await readMessages();
  const messageId = req.params.id;
  const message = messages.find((m) => m.id === messageId);
  res.json(message);
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
