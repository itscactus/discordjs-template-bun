import { Client, Events } from "discord.js";
import * as fs from "fs";
import path from "path";

interface EventData {
    name: keyof typeof Events
    once?: boolean;
    run: (...args: any[]) => void;
}

export class Event {
    private _name: string;
    private _once?: boolean;
    private _runFunction: (...args: any[]) => void;
    constructor(eventData: EventData) {
        this._name = eventData.name;
        this._once = eventData.once;
        this._runFunction = eventData.run;
    }
    get name() {
        return Events[this._name as keyof typeof Events].toString();
    }
    get once() {
        return this._once;
    }

    run(...args: any[]): void {
        this._runFunction(...args);
    }
}