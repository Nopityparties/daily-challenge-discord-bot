# The Daily Challenge Discord Bot

This bot automates beat challenges for producers. It tracks points, streaks, and supports monetization tiers and Supabase data storage.

## 💡 Features by Tier

| Tier     | Features                                                                 |
|----------|--------------------------------------------------------------------------|
| Free     | View dashboard, submissions, and tomorrow's challenge                    |
| Starter  | Custom bot name, edit challenges                                         |
| Team     | Multi-niche control, badge system                                        |
| Lifetime | Daily backups to Supabase                                                |
| SaaS     | Stripe integration + hosted version                                      |

## 🔐 .env Required

```env
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
DISCORD_TOKEN=your_token
CHANNEL_ID=your_channel_id
BOT_NAME=The Daily Challenge Discord Bot
```

Starter tier can customize `BOT_NAME`.
