require('dotenv').config(); 
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const PREFIX = "."; // Use . as your custom prefix

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  // Ignore bot messages or those not starting with the prefix
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  const [command, ...args] = message.content.slice(PREFIX.length).trim().split(/\s+/);

  if (command === 'submitted') {
    message.reply("✅ Submission received! You earned a point.");
  }

  if (command === 'leaderboard') {
    message.reply("🏆 The leaderboard feature is coming soon!");
  }

  if (command === 'settimezone') {
    message.reply("🕓 Timezone set! (this feature is in progress)");
  }
});

client.login(process.env.TOKEN);
