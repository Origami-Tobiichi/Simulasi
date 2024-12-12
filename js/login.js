document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        window.location.href = '/public/exam.html';
      } else {
        document.getElementById('error-message').innerText = 'Username atau password salah!';
      }
    })
    .catch(err => console.error(err));
});
