import express from "express";
import "dotenv/config";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Run on YoutoPia Server!");
});

// Routes file
import routes from "./routes/index.js";
app.use(routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
