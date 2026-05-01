// Switch Forms
function showSignup() {
  loginBox.classList.add("hidden");
  signupBox.classList.remove("hidden");
}

function showLogin() {
  signupBox.classList.add("hidden");
  loginBox.classList.remove("hidden");
}

// Signup
function signup() {
  let name = signupName.value;
  let email = signupEmail.value;
  let password = signupPassword.value;

  if (!name || !email || !password) {
    alert("Fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.email === email)) {
    alert("User already exists");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup success");
  showLogin();
}

// Login
function login() {
  let email = loginEmail.value;
  let password = loginPassword.value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  loadDashboard(user);
}

// Load Dashboard
function loadDashboard(user) {
  loginBox.classList.add("hidden");
  signupBox.classList.add("hidden");
  dashboard.classList.remove("hidden");

  userName.innerText = user.name;
  loadTasks();
}

// Add Task
function addTask() {
  let task = taskInput.value;

  if (!task) return;

  let user = JSON.parse(localStorage.getItem("currentUser"));

  let tasks = JSON.parse(localStorage.getItem(user.email)) || [];

  tasks.push(task);
  localStorage.setItem(user.email, JSON.stringify(tasks));

  taskInput.value = "";
  loadTasks();
}

// Load Tasks
function loadTasks() {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  let tasks = JSON.parse(localStorage.getItem(user.email)) || [];

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      ${task}
      <button class="delete" onclick="deleteTask(${index})">X</button>
    `;
    taskList.appendChild(li);
  });
}

// Delete Task
function deleteTask(index) {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  let tasks = JSON.parse(localStorage.getItem(user.email)) || [];

  tasks.splice(index, 1);
  localStorage.setItem(user.email, JSON.stringify(tasks));

  loadTasks();
}

// Logout
function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

// Auto Login
window.onload = () => {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) loadDashboard(user);
};
