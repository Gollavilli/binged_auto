// agent-runner.mjs
import { createServer } from '@playwright/mcp';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const instruction =
  process.argv[2] ||
  'Get the latest release tag from https://github.com/DataDog/helm-charts';

const run = async () => {
  // createServer() returns an object with both the server and the page client
  const { server, client } = await createServer();

  // navigate and snapshot
  await client.page.goto(
    'https://github.com/DataDog/helm-charts/releases'
  );
  const snapshot = await client.page.accessibility.snapshot();

  // ask GPT-4 to extract the info
  const { choices } = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful browser automation agent. ' +
          'Extract exactly the latest release tag from the page.'
      },
      {
        role: 'user',
        content:
          `Instruction: ${instruction}\n\n` +
          `Snapshot: ${JSON.stringify(snapshot).slice(0, 12000)}…`
      }
    ]
  });

  console.log('🧠 GPT-4 Output:\n', choices[0].message.content);

  // clean up
  await client.close();
  await server.close();
};

run();
