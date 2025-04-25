
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({ secret: 'challengebot', resave: false, saveUninitialized: true }));

const requireLogin = (req, res, next) => {
  if (req.session.loggedIn) return next();
  res.redirect('/login');
};

app.get('/login', (req, res) => res.render('login'));
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'securepassword123') {
    req.session.loggedIn = true;
    req.session.username = 'admin';
    res.redirect('/');
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

app.get('/', requireLogin, async (req, res) => {
  const botName = process.env.BOT_NAME || "The Daily Challenge Discord Bot";
  const { data, error } = await supabase.from('challenges').select().eq('niche', 'trap');
  const preview = data && data.length > 0 ? data[(new Date().getDay() + 1) % data.length].text : "No challenge queued.";
  res.render('index', { botName, preview });
});

app.listen(port, () => console.log("✅ Bot dashboard running with Supabase"));
