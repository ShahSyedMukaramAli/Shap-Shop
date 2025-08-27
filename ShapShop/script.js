// Toggle mobile nav
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Example: Update cart count (demo)
let cartCount = 0;
document.addEventListener("DOMContentLoaded", () => {
  const cartCountEl = document.getElementById("cart-count");
  // Example update
  setInterval(() => {
    cartCount++;
    cartCountEl.textContent = cartCount;
  }, 5000); // just demo increment
});


/* add to cart */

// === NAVBAR TOGGLE (for mobile) ===
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// === CART LOGIC ===
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count on load
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}
updateCartCount();

// Add to cart buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productCard = button.parentElement;
    const product = {
      name: productCard.querySelector("h3").innerText,
      price: productCard.querySelector("p").innerText,
      img: productCard.querySelector("img").src,
    };

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // Small feedback
    alert(`${product.name} added to cart!`);
  });
});


// === NAVBAR TOGGLE ===
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// === CART LOGIC ===
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count in header
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}
updateCartCount();

// Add to cart (only runs on product pages)
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    const productCard = btn.closest(".product-card");
    const product = {
      name: productCard.querySelector("h3").innerText,
      price: productCard.querySelector("p").innerText,
      img: productCard.querySelector("img").src,
    };

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    alert(`${product.name} added to cart!`);
  });
});

// Show cart items (only runs on cart.html)
const cartItemsContainer = document.getElementById("cart-items");
if (cartItemsContainer) {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cartItemsContainer.innerHTML = "";
    cart.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p>${item.price}</p>
        </div>
      `;
      cartItemsContainer.appendChild(div);
    });
  }
}
