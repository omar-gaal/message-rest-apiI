import express, { json } from "express";
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Node.js Messages REST API 🚀 UPDATED!");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
