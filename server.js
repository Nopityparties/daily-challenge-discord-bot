const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { tier: 'Free' });
});

// ✅ Render fix: bind to process.env.PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Dashboard running on port ${port}`));
