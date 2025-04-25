
const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'partysecret',
  resave: false,
  saveUninitialized: true
}));

const requireLogin = (req, res, next) => {
  if (req.session.loggedIn) return next();
  res.redirect('/login');
};

app.get('/login', (req, res) => res.render('login'));
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'securepassword123') {
    req.session.loggedIn = true;
    res.redirect('/');
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

app.get('/', requireLogin, (req, res) => {
  res.render('index', { tier: 'Free' });
});

app.get('/templates', requireLogin, (req, res) => {
  const niche = req.query.niche || 'trap';
  const templates = JSON.parse(fs.readFileSync('./data/templates.json'));
  res.render('templates', { niche, templates: templates[niche] || [] });
});

app.post('/templates/add', requireLogin, (req, res) => {
  const { niche, newChallenge } = req.body;
  const templates = JSON.parse(fs.readFileSync('./data/templates.json'));
  if (!templates[niche]) templates[niche] = [];
  templates[niche].push(newChallenge);
  fs.writeFileSync('./data/templates.json', JSON.stringify(templates, null, 2));
  res.redirect('/templates?niche=' + niche);
});

app.post('/templates/delete', requireLogin, (req, res) => {
  const { niche, index } = req.body;
  const templates = JSON.parse(fs.readFileSync('./data/templates.json'));
  templates[niche].splice(index, 1);
  fs.writeFileSync('./data/templates.json', JSON.stringify(templates, null, 2));
  res.redirect('/templates?niche=' + niche);
});

app.get('/submissions', requireLogin, (req, res) => {
  const users = JSON.parse(fs.readFileSync('./data/user_streaks.json'));
  res.render('submissions', { users });
});

app.listen(port, () => console.log(`✅ Dashboard running on port ${port}`));
