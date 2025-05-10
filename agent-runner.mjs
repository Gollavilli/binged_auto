import { MCPServer, MCPClient } from "./dist/index.js";
import OpenAI from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const instruction = process.argv[2] || "Get the latest release tag from https://github.com/DataDog/helm-charts";

const run = async () => {
  const server = await MCPServer.launch();
  const client = await MCPClient.connect(server.wsEndpoint());

  await client.page.goto("https://github.com/DataDog/helm-charts/releases");
  const snapshot = await client.page.accessibility.snapshot();

  const result = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful browser automation agent." },
      { role: "user", content: `Instruction: ${instruction}\nSnapshot: ${JSON.stringify(snapshot).slice(0, 12000)}...` }
    ]
  });

  console.log("🧠 GPT Output:\n", result.choices[0].message.content);
  await client.close();
  await server.close();
};

run();
