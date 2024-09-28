// app.js
document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Send login request to backend
  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  if (result.success) {
    alert('Login successful!');
    // Redirect to dashboard or protected route
  } else {
    alert('Login failed: ' + result.message);
  }
});

document.getElementById('signup-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  // Send signup request to backend
  const response = await fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  if (result.success) {
    alert('Sign up successful! Please log in.');
  } else {
    alert('Sign up failed: ' + result.message);
  }
});
