import { Client } from "discord.js";
import { Spinner } from "@topcli/spinner";
import loadEvents from "./src/methods/loadEvents";
import { SlashCommandManager } from "./src/handlers/Command";

const client: Client = new Client({
    intents: [
        "Guilds", "MessageContent"
    ]
})
declare module "discord.js" {
    interface Client {
        slashCommandManager: SlashCommandManager;
        basePath: string;
    }
}
client.slashCommandManager = new SlashCommandManager(client);
loadEvents();
client.login(process.env.TOKEN)

export default client;