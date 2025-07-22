import { Collection } from "discord.js";
import type { CommandInteraction } from "../types";
import { Console } from "@lib/utils";
import { globSync } from "glob";

type CommandsCollection = Collection<string, Command>;

const commands: CommandsCollection = new Collection();

export const setupCommands = async (): Promise<void> => {
  const pattern = "src/modules/**/commands/**/*.{ts,js}";

  const commandFiles = globSync(pattern, {
    ignore: ["**/*.{test,spec}.{ts,js}", "**/*_*.{ts,js}", "**/index.{ts,js}"],
  });

  if (!commandFiles || !commandFiles.length)
    return Console.Warn("(Commands) No command files found.");

  for (const commandFile of commandFiles) {
    const command: Command = await import(commandFile);

    if (!command.config || !command.execute) {
      Console.Warn(
        `(Commands) Command file ${commandFile} is missing config or execute function.`
      );
      continue;
    }

    commands.set(command.config.name, command);
    Console.Log(`(Commands) Loaded command: ${command.config.name}`);
  }

  Console.Log(`(Commands) Total commands loaded: ${commands.size}`);
};

export const handleCommand = async (interaction: CommandInteraction) => {
  const command = commands.get(interaction.commandName);

  if (!command)
    return Console.Warn(
      `(Commands) Command not found: ${interaction.commandName}`
    );

  try {
    await command.execute(interaction);
  } catch (error) {
    Console.Error(
      `(Commands) Error executing ${interaction.commandName}`,
      error
    );
  }
};
