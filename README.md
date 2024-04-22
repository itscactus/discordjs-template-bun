# discordjs-template-bun
##### a Discord JS template for Bun JS

Clean console outputs
![Console outputs][def]

## Easy to use Command / Events API
##### Command API
```js
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
```
##### Event API
```js
import { Event } from "../handlers/Event";
import { Client } from "discord.js";

export default new Event({
    name: 'ClientReady',
    run(client: Client) {
        console.log(`[${client.user?.username}] is logged in.`)
    },
})
```

# Installation

### requirements

* [Bun JS](https://bun.sh)
* Discord JS (bun add discord.js)
* @topcli/spinner (bun add @topcli/spinner)
* fs (bun add fs)

```bash
# Clone Project to your PC
git clone https://github.com/itscactus/discordjs-template-bun
# If u in windows
powershell -c "irm bun.sh/install.ps1 | iex"
# If u in Linux
curl -fsSL https://bun.sh/install | bash
# Install bun requirements
bun add discord.js @topcli/spinner fs
```

#### Discord: cactusdev
[def]: image.png