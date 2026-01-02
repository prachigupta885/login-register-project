const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    showMessage("All fields are required", "red");
    return;
  }

  //  password rule
  const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!passwordRegex.test(password)) {
    showMessage("Invalid password format", "red");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(user => user.email === email);

  if (!user) {
    showMessage("Account not found. Please register first.", "red");
    return;
  }

  if (user.password !== password) {
    showMessage("Incorrect password", "red");
    return;
  }

  showMessage("Login successful!", "green");
});

function showMessage(text, color) {
  msg.textContent = text;
  msg.style.color = color;
}
