const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Login API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'anggara' && password === 'anggara11') {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Questions API
app.get('/api/questions', (req, res) => {
  const questions = JSON.parse(fs.readFileSync('./server/data/questions.json', 'utf-8'));
  const shuffled = questions.sort(() => Math.random() - 0.5);
  res.json(shuffled);
});

// Submit API
app.post('/api/submit', (req, res) => {
  const { answers } = req.body;
  const questions = JSON.parse(fs.readFileSync('./server/data/questions.json', 'utf-8'));
  let score = 0;

  answers.forEach((answer, index) => {
    if (questions[index] && questions[index].answer === parseInt(answer[1])) {
      score += 10;
    }
  });

  res.json({ score });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
