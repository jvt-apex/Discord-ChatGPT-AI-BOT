require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ], 
});

client.commands = new Collection();
const commandPaths = path.join(__dirname, "commands");
const commandFiles = fs
    .readdirSync(commandPaths)
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandPaths, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
    console.log("Ready!");
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ 
            content: "There was an error while executing this command!",
            ephemeral: true, 
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
console.log("Ole Greg's Smart Cousin is Online in Discord");
