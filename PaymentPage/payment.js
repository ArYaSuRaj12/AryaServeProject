document.addEventListener("DOMContentLoaded", () => {
  const amountElement = document.getElementById("amount");
  const total = localStorage.getItem("orderTotal") || 0;
  amountElement.textContent = total;
});

const form = document.getElementById("paymentForm");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");
const popupButton = document.getElementById("popupButton");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const selectedMethod = document.querySelector('input[name="method"]:checked').value;
  const totalAmount = parseInt(localStorage.getItem("orderTotal")) || 0;

  if (totalAmount === 0) {
    showPopup("Cart Empty!", "Please add items before proceeding to payment.", "../MenuPage/index.html");
    return;
  }

  localStorage.removeItem("orderTotal");
  showPopup("Payment Successful 🎉", `Paid via ${selectedMethod}. Redirecting to Login Page...`, "../MainPage/Main.html");
});

function showPopup(title, message, redirectUrl) {
  popupTitle.textContent = title;
  popupMessage.textContent = message;
  popup.classList.remove("hidden");

  popupButton.onclick = () => {
    popup.classList.add("hidden");
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 200);
  };
}
