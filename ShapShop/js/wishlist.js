document.addEventListener("DOMContentLoaded", () => {
  const WISHLIST_KEY = "shap_shop_wishlist";

  const $ = (q, ctx = document) => ctx.querySelector(q);
  const $$ = (q, ctx = document) => Array.from(ctx.querySelectorAll(q));
  const money = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  const readWishlist = () => JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
  const writeWishlist = (wishlist) => localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));

  // Add to wishlist from product page
  $$(".add-to-wishlist").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".product-card");
      if (!card) return;

      const id = card.dataset.id;
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price);
      const img = card.dataset.img;

      if (!id || !name) return; // avoid nulls

      let wishlist = readWishlist();
      if (wishlist.some(item => item.id === id)) {
        alert("Already in wishlist");
        return;
      }

      wishlist.push({ id, name, price, img });
      writeWishlist(wishlist);
      alert(`${name} added to wishlist!`);
    });
  });

  // Render wishlist page
  function renderWishlistPage() {
    const container = $("#wishlistContainer");
    if (!container) return;

    const wishlist = readWishlist();
    container.innerHTML = "";

    if (wishlist.length === 0) {
      container.innerHTML = "<p>Your wishlist is empty.</p>";
      return;
    }

    wishlist.forEach(item => {
      if (!item || !item.id || !item.name) return;
      const div = document.createElement("div");
      div.className = "wishlist-item";
      div.dataset.id = item.id;
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="item-info">
          <h3>${item.name}</h3>
          <div class="price">${money(item.price)}</div>
          <button class="remove-from-wishlist">Remove</button>
        </div>
      `;
      container.appendChild(div);
    });

    container.addEventListener("click", (e) => {
      if (!e.target.matches(".remove-from-wishlist")) return;
      const id = e.target.closest(".wishlist-item")?.dataset.id;
      if (!id) return;

      const updated = readWishlist().filter(item => item.id !== id);
      writeWishlist(updated);
      renderWishlistPage();
    });
  }

  renderWishlistPage();
});
