import { Event } from "../handlers/Event";
import { Client, ChatInputCommandInteraction, type Interaction } from "discord.js"

export default new Event({
    name: 'InteractionCreate',
    run(client: Client, interaction: Interaction) {
        if(interaction.isCommand()) {
            let commandName = interaction.commandName;
            let cmd = client.slashCommandManager.getSlashCommand(commandName);
            if(cmd) cmd.run(client, interaction as ChatInputCommandInteraction);
            else interaction.reply({
                ephemeral: true,
                content: 'There was a problem with the command, Please report to an developer.'
            })
        } else if(interaction.isAutocomplete()) {
            let commandName = interaction.commandName;
            let cmd = client.slashCommandManager.getSlashCommand(commandName);
            if(cmd?.autocomplete) {
                try {
                    cmd.autocomplete(client, interaction)
                } catch(err) {

                }
            }
        }
    },
})