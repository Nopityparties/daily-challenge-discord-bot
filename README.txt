Daily Challenge Discord Bot
===========================

This bot helps you run a daily challenge server with streak tracking, leaderboard rankings, and a public dashboard.
It was designed for producers, creators, and business-minded communities that want structure and daily engagement.

---------------------------
FEATURES:
---------------------------
• Daily Challenge System
• Points + Streak Tracker
• Leaderboard Commands
• Motivational Messages
• Web Dashboard (Express + EJS)
• Custom Niche Challenge Templates
• Admin-only niche switching
• User-tier submission tracking (for monetization)
• Dynamic keyword substitution per challenge

---------------------------
INSTALLATION:
---------------------------
1. Upload this repository to GitHub (or clone it):
   https://github.com/your-username/daily-challenge-discord-bot

2. On your Render.com account:
   • Create a Web Service for bot.js (Start Command: node bot.js)
   • Add environment variables:
     TOKEN=your_discord_bot_token
     CHANNEL_ID=your_channel_id

3. OPTIONAL: Host the dashboard
   • Create a second Render service
   • Start command: node server.js
   • View public dashboard at https://your-app.onrender.com

4. Commands inside Discord:
   .submitted        → Submit a challenge
   .leaderboard      → View ranks
   .settimezone      → Save timezone for streaks (in progress)

---------------------------
LICENSE (MIT):
---------------------------
You are free to:
✔ Use
✔ Modify
✔ Resell
✔ Distribute

You may not:
✘ Hold the authors liable
✘ Expect warranty or support without a paid plan

---------------------------
SUGGESTED PRICING:
---------------------------
• One-time purchase for solo use: $29
• Team license: $59 (up to 5 admins)
• Hosted SaaS version: $5–10/month
• Free community tier with locked features

These prices are modeled after similar bots on sites like Gumroad, Whop, and BotGhost marketplace.

---------------------------
CREDITS:
---------------------------
Created by @Nopityparties with help from ChatGPT
Contact for licensing/custom versions: nopityparties@gmail.com
