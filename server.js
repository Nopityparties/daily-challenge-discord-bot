
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const nichePath = path.join(__dirname, 'selected_niche.json');
let currentNiche = 'trap';
if (fs.existsSync(nichePath)) {
  currentNiche = JSON.parse(fs.readFileSync(nichePath)).niche || 'trap';
}

const templatesPath = path.join(__dirname, 'templates.json');
let templates = {};
if (fs.existsSync(templatesPath)) {
  templates = JSON.parse(fs.readFileSync(templatesPath));
}

const submissionsPath = path.join(__dirname, 'user_submissions.json');
let userSubs = {};
if (fs.existsSync(submissionsPath)) {
  userSubs = JSON.parse(fs.readFileSync(submissionsPath));
}

app.get('/', (req, res) => {
  res.render('index', { currentNiche });
});

app.post('/setniche', (req, res) => {
  const newNiche = req.body.niche;
  fs.writeFileSync(nichePath, JSON.stringify({ niche: newNiche }));
  res.redirect('/');
});

app.get('/templates', (req, res) => {
  const niche = req.query.niche || 'trap';
  const entries = templates[niche] || [];
  res.render('templates', { niche, entries });
});

app.post('/templates', (req, res) => {
  const { niche, template } = req.body;
  if (!templates[niche]) templates[niche] = [];
  templates[niche].push(template);
  fs.writeFileSync(templatesPath, JSON.stringify(templates, null, 2));
  res.redirect(`/templates?niche=${niche}`);
});

app.post('/logsubmission', (req, res) => {
  const { userId, username, tier } = req.body;
  if (!userSubs[userId]) {
    userSubs[userId] = { username, tier, count: 0 };
  }
  userSubs[userId].count++;
  fs.writeFileSync(submissionsPath, JSON.stringify(userSubs, null, 2));
  res.sendStatus(200);
});

app.get('/submissions', (req, res) => {
  res.render('submissions', { userSubs });
});

app.listen(port, () => {
  console.log(`Dashboard running at http://localhost:${port}`);
});
