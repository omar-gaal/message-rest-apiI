// 7,4

import express from "express";
import fs from "fs/promises";
import { randomUUID } from "crypto";

import cors from "cors";
import { send } from "process";

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
  const messages = await readMessages();

  const newMessage = {
    id: randomUUID(),
    date: new Date().toISOString(),
    text: "Test besked fra serveren!",
    sender: "server",
  };

  messages.push(newMessage);
  await writeMessage(messages);

  res.json(newMessage);
});

app.get("/messages", async (req, res) => {
  const messages = await readMessages();
  res.json(messages);
});

app.post("/messages", async (req, res) => {
  const messages = await readMessages();
  const { text, sender } = req.body;

  const newMessage = {
    id: randomUUID(),
    date: new Date().toISOString(),
    text,
    sender,
  };

  messages.push(newMessage);
  await writeMessage(messages);
  res.json(newMessage);
  console.log(messages);
});

app.put("/messages/:id", async (req, res) => {
  const messages = await readMessages();
  const messageId = req.params.id;
  const message = messages.find((message) => message.id === messageId);

  const { text, sender } = req.body;
  message.text = text;
  message.sender = sender;

  writeMessage(messages);
  res.json(message);
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
