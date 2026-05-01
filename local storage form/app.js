// Show forms
function showSignup() {
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("signupBox").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("signupBox").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
}

// Signup
function signup() {
  let name = document.getElementById("signupName").value;
  let email = document.getElementById("signupEmail").value;
  let password = document.getElementById("signupPassword").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let userExists = users.find(user => user.email === email);
  if (userExists) {
    alert("User already exists!");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful!");
  showLogin();
}

// Login
function login() {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let validUser = users.find(user => user.email === email && user.password === password);

  if (!validUser) {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(validUser));

  showDashboard(validUser);
}

// Show Dashboard
function showDashboard(user) {
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("signupBox").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");

  document.getElementById("userName").innerText = user.name;
}

// Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

// Auto login if already logged in
window.onload = function () {
  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    showDashboard(user);
  }
};