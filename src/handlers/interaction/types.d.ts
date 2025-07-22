import type {
  ChatInputCommandInteraction,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js";

export type CommandInteraction = ChatInputCommandInteraction<"cached">;

declare global {
  type Command<T = SlashCommandOptionBuilder | SlashCommandOptionsOnlyBuilder> =
    {
      config: T;
      execute: (interaction: CommandInteraction) => Promise<unknown>;
    };
}
