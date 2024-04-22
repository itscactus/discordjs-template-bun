import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../handlers/Command";

export default new SlashCommand({
    _data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Get the bot\'s ping info.'),
    run(client, interaction) {
        interaction.reply(`[${client.user?.username}] Bot's ping is currently at \`${client.ws.ping}ms\``)
    },
})