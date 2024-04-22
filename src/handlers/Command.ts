import { SlashCommandBuilder, Client, Collection, ChatInputCommandInteraction, AutocompleteInteraction } from "discord.js";
import { readdirSync } from "fs";

export interface SlashCommandData {
    _data: SlashCommandBuilder;
    run: (client: Client, interaction: ChatInputCommandInteraction) => void;
    autocomplete?: (client: Client, interaction: AutocompleteInteraction) => void;
}

export class SlashCommandManager {
    private commands: Collection<string, SlashCommandData>;
    private client: Client;
    constructor(client: Client) {
        this.commands = new Collection();
        this.client = client;
    }
    async registerSlashCommand(name: string, commandData: SlashCommandData) {
        this.commands.set(name, commandData);
        return await this.client.application?.commands.create(commandData._data).then((cmd) => true)
    }
    async deleteSlashCommand(name: string) {
        this.commands.delete(name);
        const applicationCommands = await this.client.application?.commands.fetch();
        let cmdToDelete = applicationCommands?.find((val) => val.name == name);
        if(!cmdToDelete) return false;
        return await cmdToDelete.delete();
    }
    get allSlashCommands() {
        return this.commands;
    }
    getSlashCommand(name: string) {
        return this.commands.get(name);
    }
}

export class SlashCommand {
    private _data: SlashCommandBuilder;
    private _runFunction: (client: Client, interaction: ChatInputCommandInteraction) => void;
    private _runAutocomplete?: (client: Client, interaction: AutocompleteInteraction) => void;
    constructor(commandData: SlashCommandData) {
        this._data = commandData._data;
        this._runFunction = commandData.run
        this._runAutocomplete = commandData.autocomplete;
    }

    get name() {
        return this._data.name;
    }
    get description() {
        return this._data.description;
    }
    get options() {
        return this._data.options;
    }
    
    run(client: Client, interaction: ChatInputCommandInteraction): void {
        this._runFunction(client, interaction);
    }
    autocomplete(client: Client, interaction: AutocompleteInteraction): void {
        if(this._runAutocomplete) {
            this._runAutocomplete(client, interaction);
        } else {
            return;
        }
    }
}