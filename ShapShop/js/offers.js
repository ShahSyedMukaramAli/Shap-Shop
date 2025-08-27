document.addEventListener("DOMContentLoaded", () => {
  const offers = [
    { id: "off-001", name: "Apple MacBook Air - 10% Off", price: 90999, img: "image/APPMAC.jpg" },
    { id: "off-002", name: "Butterfly 2 Burner Gas Stove - 15% Off", price: 6000, img: "image/Hgas.jpg" },
    { id: "off-003", name: "LEGO Harry Potter Set - 20% Off", price: 999, img: "image/Khp.jpg" },
    { id: "off-004", name: "Gym Bags for Men - 10% Off", price: 409, img: "image/Sbg.jpg" }
  ];

  const offersList = document.getElementById("offers-list");

  if (!offersList) return;

  offersList.innerHTML = offers.map(item => `
    <div class="product-card" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-img="${item.img}">
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <div class="price">${item.price}</div>
      <button type="button" class="btn add-to-cart">Add to Cart</button>
    </div>
  `).join("");
});
