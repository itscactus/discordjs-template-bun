import { Spinner } from "@topcli/spinner";
import { readdirSync } from "fs";
import type { SlashCommandData } from "../handlers/Command";
import client from "../..";

export default () => {
    let commandCategories = readdirSync('./src/slashCommands');
    const spinner = new Spinner().start(`[SlashCommand] ${commandCategories.length} category(ies) are loading`);
    let unsucessed = [];
    commandCategories.map(async(dir) => {
        let commandFiles = readdirSync('./src/slashCommands/' + dir).filter(f => f.endsWith(".ts"));
        await Promise.all(commandFiles.map(async(file) => {
            spinner.text = `[SlashCommand] ${file} is loading..`
            let command: SlashCommandData = (await import(`../slashCommands/${dir}/${file}`)).default;
            let response = await client.slashCommandManager.registerSlashCommand(command._data.name, command);
            if(response == true) spinner.text = `[SlashCommand] /${command._data.name} is registered as successfully.`
            else {
               unsucessed.push(file);
               console.log(`[SlashCommand] Command in ${file} can't be registered.`)
               spinner.text = `[SlashCommand] Command in ${file} can't be registered.`
            }
        }));
        spinner.text = `[SlashCommand] ${dir} category is loaded as successfully`;
    })
    spinner.succeed(`[SlashCommand] ${commandCategories.length - unsucessed.length} slash command(s) loaded as successfully`)
}