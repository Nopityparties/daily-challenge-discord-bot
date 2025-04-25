require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');
const { DateTime } = require('luxon');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const PREFIX = ".";
const dataPath = path.join(__dirname, 'data/user_streaks.json');

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  const [command] = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const userId = message.author.id;
  const username = message.author.username;

  if (command === 'submitted') {
    const now = DateTime.local().setZone('America/New_York');
    const date = now.toFormat('yyyy-MM-dd');
    const isAM = now.hour < 12;

    let users = {};
    if (fs.existsSync(dataPath)) {
      users = JSON.parse(fs.readFileSync(dataPath));
    }

    if (!users[userId]) {
      users[userId] = {
        username,
        points: 0,
        currentStreak: 0,
        lastSubmissionAM: null,
        lastSubmissionPM: null,
        lastStreakDay: null
      };
    }

    const user = users[userId];
    let response = "";
    const alreadySubmitted = (isAM && user.lastSubmissionAM === date) || (!isAM && user.lastSubmissionPM === date);

    if (alreadySubmitted) {
      response = `You've already submitted this ${isAM ? "morning" : "afternoon"}.`;
    } else {
      if (isAM) user.lastSubmissionAM = date;
      else user.lastSubmissionPM = date;

      if (user.lastStreakDay !== date) {
        user.currentStreak += 1;
        user.points += 1;
        user.lastStreakDay = date;
        response = `✅ Streak increased to ${user.currentStreak}. Total Points: ${user.points}`;
      } else {
        user.points += 1;
        response = `✨ Bonus point earned! Total Points: ${user.points}`;
      }
    }

    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
    message.reply(response);
  }

  if (command === 'leaderboard') {
    if (!fs.existsSync(dataPath)) return message.reply("No data.");
    const users = JSON.parse(fs.readFileSync(dataPath));
    const leaderboard = Object.values(users)
      .sort((a, b) => b.points - a.points)
      .slice(0, 5)
      .map((u, i) => `${i + 1}. ${u.username} — ⭐ ${u.points} pts | 🔥 ${u.currentStreak} streak`);

    message.reply("🏆 Top Producers:
" + leaderboard.join("\n"));
  }

  if (command === 'version') {
    message.reply("🛠 You are using the *Free Version* of The Party Bot Pro. Upgrade at: https://gumroad.com/l/thepartybot");
  }

  if (command === 'buybot') {
    message.reply("💸 Buy your own bot here: https://gumroad.com/l/thepartybot");
  }
});

client.login(process.env.TOKEN);
