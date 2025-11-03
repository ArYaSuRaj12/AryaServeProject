// -------------------------------------------
// script.js — AryaServe Menu Page Logic
// -------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-btn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalPrice = 0;

  // Render the cart items
  function renderCart() {
    cartItemsContainer.innerHTML = "";
    totalPrice = 0;

    cart.forEach((item, index) => {
      totalPrice += item.price * item.quantity;

      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <p><strong>${item.name}</strong> - ₹${item.price}</p>
        <div class="quantity-controls">
          <button class="decrease" data-index="${index}">-</button>
          <span>${item.quantity}</span>
          <button class="increase" data-index="${index}">+</button>
        </div>
        <button class="remove-item" data-index="${index}">Remove</button>
      `;
      cartItemsContainer.appendChild(div);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Add to Cart
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.parentElement.querySelector("h3").innerText;
      const price = parseInt(btn.dataset.price);
      const existingItem = cart.find((item) => item.name === name);

      if (existingItem) existingItem.quantity++;
      else cart.push({ name, price, quantity: 1 });

      renderCart();
    });
  });

  // Quantity and Remove
  cartItemsContainer.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("increase")) {
      cart[index].quantity++;
    } else if (e.target.classList.contains("decrease")) {
      cart[index].quantity > 1 ? cart[index].quantity-- : cart.splice(index, 1);
    } else if (e.target.classList.contains("remove-item")) {
      cart.splice(index, 1);
    }
    renderCart();
  });

  // Checkout
  checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }

    const total = totalPrice.toFixed(2);
    localStorage.setItem("orderTotal", total);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Redirecting to payment page...");
    window.location.href = "../PaymentPage/payment.html";
  });

  renderCart();
});
