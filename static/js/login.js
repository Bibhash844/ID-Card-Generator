const loginLink = document.getElementById("login-link");
const registerLink = document.getElementById("register-link");

// Get the login and register forms
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

// Add event listeners to the links
loginLink.addEventListener("click", () => {
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
});

registerLink.addEventListener("click", () => {
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
});
