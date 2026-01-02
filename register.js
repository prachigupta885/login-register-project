const form = document.getElementById("registerForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (!name || !email || !password || !confirmPassword) {
    showMessage("All fields are required", "red");
    return;
  }

  // Password rules
  const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!passwordRegex.test(password)) {
    showMessage(
      "Password must be at least 6 characters and include 1 number & 1 special character",
      "red"
    );
    return;
  }

  if (password !== confirmPassword) {
    showMessage("Passwords do not match", "red");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const emailExists = users.some(user => user.email === email);
  if (emailExists) {
    showMessage("This email is already used. Please create another account.", "red");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  showMessage("Account created successfully!", "green");
  form.reset();
});

function showMessage(text, color) {
  msg.textContent = text;
  msg.style.color = color;
}
