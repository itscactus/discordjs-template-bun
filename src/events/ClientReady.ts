import { Event } from "../handlers/Event";
import { Client } from "discord.js";
import loadSlashCommands from "../methods/loadSlashCommands";

export default new Event({
    name: 'ClientReady',
    run(client: Client) {
        loadSlashCommands();
        
        console.log(`[${client.user?.username}] is logged in.`)
    },
})