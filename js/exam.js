fetch('/api/questions')
  .then(response => response.json())
  .then(questions => {
    const container = document.getElementById('questions-container');
    questions.forEach((q, index) => {
      const shuffledOptions = q.options.sort(() => Math.random() - 0.5);
      const questionEl = document.createElement('div');
      questionEl.innerHTML = `
        <p>${index + 1}. ${q.question}</p>
        ${shuffledOptions
          .map(
            (option, i) =>
              `<label>
                <input type="radio" name="question${index}" value="${i}">
                ${option}
              </label><br>`
          )
          .join('')}
      `;
      container.appendChild(questionEl);
    });
  });

document.getElementById('exam-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const answers = Array.from(new FormData(e.target));
  fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers })
  })
    .then(res => res.json())
    .then(data => alert(`Nilai Anda: ${data.score}`))
    .catch(err => console.error(err));
});
