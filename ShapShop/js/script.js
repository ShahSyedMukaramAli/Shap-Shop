// Key for localStorage
const CART_KEY = "shap_shop_cart";

/* ------------ Helpers ------------ */
const $ = (q, ctx = document) => ctx.querySelector(q);
const $$ = (q, ctx = document) => Array.from(ctx.querySelectorAll(q));
const money = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

const readCart = () => JSON.parse(localStorage.getItem(CART_KEY) || "[]");
const writeCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));

// Count = sum of qty
const cartCount = (cart) => cart.reduce((s, it) => s + (it.qty || 1), 0);

function updateCartBadge() {
  const cart = readCart();
  const badge = $("#cart-count");
  if (badge) badge.textContent = cartCount(cart);
}

/* ------------ Navbar (mobile) ------------ */
function setupNav() {
  const hb = $("#hamburger");
  const nav = $("#navLinks");
  if (!hb || !nav) return;
  hb.addEventListener("click", () => nav.classList.toggle("active"));
}

/* ------------ Add to Cart (delegation) ------------ */
function setupAddToCart() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-cart");
    if (!btn) return;

    const card = btn.closest(".product-card");
    if (!card) return;

    // Read from data-* attributes
    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price || "0");
    const img = card.dataset.img || (card.querySelector("img")?.src || "");

    let cart = readCart();
    const existing = cart.find((it) => it.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, name, price, img, qty: 1 });
    }
    writeCart(cart);
    updateCartBadge();

    // Lightweight feedback
    btn.textContent = "Added!";
    setTimeout(() => (btn.textContent = "Add to Cart"), 900);
  });
}

/* ------------ Render Cart Page ------------ */
function renderCartPage() {
  const list = $("#cart-items");
  const sumCountEl = $("#summary-count");
  const sumTotalEl = $("#summary-total");
  const clearBtn = $("#clear-cart");
  if (!list) return; // not on cart page

  function render() {
    const cart = readCart();
    list.innerHTML = "";

    if (cart.length === 0) {
      list.innerHTML = `<div class="cart-empty">Your cart is empty.</div>`;
      if (sumCountEl) sumCountEl.textContent = "0";
      if (sumTotalEl) sumTotalEl.textContent = money(0);
      updateCartBadge();
      return;
    }

    // Items
    cart.forEach((it) => {
      const row = document.createElement("div");
      row.className = "cart-item";
      row.dataset.id = it.id;
      row.innerHTML = `
        <img src="${it.img}" alt="${it.name}">
        <div class="item-info">
          <h3>${it.name}</h3>
          <div class="price">${money(it.price)}</div>
        </div>
        <div class="controls">
          <div class="qty-box">
            <button class="qty-btn minus" aria-label="Decrease quantity">-</button>
            <span class="qty">${it.qty}</span>
            <button class="qty-btn plus" aria-label="Increase quantity">+</button>
          </div>
          <button class="remove-btn">Remove</button>
        </div>
      `;
      list.appendChild(row);
    });

    // Summary
    const totalQty = cartCount(cart);
    const totalPrice = cart.reduce((s, it) => s + it.price * it.qty, 0);
    if (sumCountEl) sumCountEl.textContent = String(totalQty);
    if (sumTotalEl) sumTotalEl.textContent = money(totalPrice);

    updateCartBadge();
  }

  // Interactions
  list.addEventListener("click", (e) => {
    const id = e.target.closest(".cart-item")?.dataset.id;
    if (!id) return;
    let cart = readCart();

    if (e.target.matches(".plus")) {
      const item = cart.find((it) => it.id === id);
      if (item) item.qty += 1;
      writeCart(cart); render();
    } else if (e.target.matches(".minus")) {
      const item = cart.find((it) => it.id === id);
      if (item) {
        item.qty -= 1;
        if (item.qty <= 0) cart = cart.filter((it) => it.id !== id);
      }
      writeCart(cart); render();
    } else if (e.target.matches(".remove-btn")) {
      cart = cart.filter((it) => it.id !== id);
      writeCart(cart); render();
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem(CART_KEY);
      render();
    });
  }

  render();
}

/* ------------ Boot ------------ */
document.addEventListener("DOMContentLoaded", () => {
  setupNav();
  updateCartBadge();
  setupAddToCart();
  renderCartPage();
});




