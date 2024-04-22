import { Spinner } from "@topcli/spinner";
import { readdirSync } from "fs";
import type { Event } from "../handlers/Event";
import client from "../..";

export default () => {
    let eventFiles = readdirSync('./src/events').filter(f => f.endsWith(".ts"));
    const spinner = new Spinner().start(`[Events] ${eventFiles.length} events are loading`);
    let unsucessed = [];
    eventFiles.map(async(file) => {
        spinner.text = `[Events] ${file} is loading..`
        const event: Event = (await import(`../events/${file}`)).default;
        try {
            if(event?.once == true) {
                client.once(event.name, (...args: any) => event.run(client, ...args))
            } else {
                client.on(event.name, (...args: any) => event.run(client, ...args))
            }
            spinner.text = `[Events] ${file} is loaded as successfully`;
        } catch(err) {
            unsucessed.push(file);
            console.log(`[Events] ${file} can't loaded, error: ${err}`)
            spinner.text = `[Events] ${file} can't loaded, error: ${err}`;
        }
    })
    spinner.succeed(`[Events] ${eventFiles.length - unsucessed.length} event(s) loaded as successfully`)
}