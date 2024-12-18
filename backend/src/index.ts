import { WebSocketServer } from "ws";
import { webSocketServerManager } from "./utils/webSocketManager";
import cors from "cors";
import express from "express";
const app = express();
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello from backend");
});

app.use(express.json())
app.post("/askAi", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-Nemo-Instruct-2407/v1/chat/completions",
      {
        model: "mistralai/Mistral-Nemo-Instruct-2407",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 5000,
        stream: false,
      },
      {
        headers: {
          authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.send(JSON.stringify(response.data));
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

const httpServer = app.listen(8080, () => {
  console.log("server listening on port 8080");
});

const wss = new WebSocketServer({
  host: "your-domain.com",
  server: httpServer,
});

webSocketServerManager(wss);
