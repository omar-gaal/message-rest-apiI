import cors from "cors";
import express, { json } from "express";

const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Node.js Messages REST API 🚀 UPDATED!");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
