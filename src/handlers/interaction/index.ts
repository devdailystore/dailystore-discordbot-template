import { handleCommand, setupCommands } from "./commands";

import { Console } from "@lib/utils";
import { client } from "@lib/client";

const setupHandlers = async () => {
  await setupCommands();
};

export const setupInteractionHandlers = async () => {
  await setupHandlers();

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand() || !interaction.inCachedGuild())
      return;

    try {
      await handleCommand(interaction);
    } catch (error) {
      Console.Error(
        `(Interaction) Error handling command: ${interaction.commandName}`,
        error
      );
    }
  });
};
