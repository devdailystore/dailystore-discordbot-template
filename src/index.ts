import { client } from "@lib/client";

client.once("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

await client.login(process.env.BOT_TOKEN);
