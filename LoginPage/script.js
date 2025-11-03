// script.js

document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.querySelector('input[type="text"]').value.trim();
    const password = document.querySelector('input[type="password"]').value.trim();

    if (username === "" || password === "") {
      alert("Please enter both username and password!");
      return;
    }

    // ✅ Accept any credentials and redirect to MenuPage
    alert(`Welcome, ${username}!`);
    window.location.href = "../MenuPage/index.html";
  });
});
