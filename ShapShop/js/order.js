/*document.addEventListener("DOMContentLoaded", () => {
  const orderList = document.getElementById("orderList");
  const orders = JSON.parse(localStorage.getItem("shapshopOrders")) || [];

  if (orders.length === 0) {
    orderList.innerHTML = "<p>No orders placed yet.</p>";
    return;
  }

  orders.forEach(order => {
    const div = document.createElement("div");
    div.classList.add("order-item");
    div.innerHTML = `
      <h3>Order #${order.id}</h3>
      <p><strong>Date:</strong> ${order.date}</p>
      <p><strong>Status:</strong> ${order.status}</p>
      <p><strong>Payment Method:</strong> ${order.method}</p>
      <p><strong>Delivery Address:</strong><br>
        ${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.zip}
      </p>
      <h4>Items:</h4>
      <ul>
        ${order.items.map(i => `<li>${i.name} - $${i.price}</li>`).join("")}
      </ul>
    `;
    orderList.appendChild(div);
  });
});




// --- Order.js ---

const money = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const orderBox = document.getElementById("orderBox");

if (orderBox) {
  const order = JSON.parse(localStorage.getItem("lastOrder") || "null");

  if (!order) {
    orderBox.innerHTML = `<p>No recent order found. <a href="index.html">Shop now</a></p>`;
  } else {
    let html = `<h2>Order Placed</h2>`;
    html += `<p><strong>Date:</strong> ${new Date(order.time).toLocaleString()}</p>`;
    html += `<p><strong>Payment:</strong> ${order.method}</p>`;

    // Address
    if (order.address) {
      const a = order.address;
      html += `<div class="order-address">
        <h3>Delivery Address</h3>
        <p>${a.street}, ${a.city}, ${a.state} - ${a.zip}</p>
      </div>`;
    }

    // Items
    let total = 0;
    html += `<div class="order-items"><h3>Items</h3>`;
    order.items.forEach((it) => {
      const line = it.price * it.qty;
      total += line;
      html += `<div class="order-item">
        <span>${it.name} (x${it.qty})</span>
        <span>${money(line)}</span>
      </div>`;
    });
    html += `<div class="order-total"><strong>Total: ${money(total)}</strong></div>`;
    html += `</div>`;

    // Status (static example)
    html += `<div class="order-status">
      <h3>Status</h3>
      <p>✅ Confirmed<br>🚚 Out for delivery soon</p>
    </div>`;

    orderBox.innerHTML = html;
  }
}
*/



// --- Page Protection ---
const loggedIn = localStorage.getItem("isLoggedIn");
if (loggedIn !== "true") {
  alert("Please login to access this page!");
  window.location.href = "login.html";
}







// --- Order.js with Status Timeline ---

const money = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

const orderBox = document.getElementById("orderBox");

// Helper: calculate status step
function getOrderStep(orderTime) {
  const placed = new Date(orderTime);
  const now = new Date();
  const diffDays = Math.floor((now - placed) / (1000 * 60 * 60 * 24));

  if (diffDays < 2) return 1; // Processing
  if (diffDays < 4) return 2; // Shipped
  return 3; // Delivered
}

if (orderBox) {
  const allOrders = JSON.parse(localStorage.getItem("shap_shop_orders") || "[]");

  if (!allOrders.length) {
    orderBox.innerHTML = `<p>No orders found. <a href="index.html">Shop now</a></p>`;
  } else {
    let html = ``;
    allOrders
      .sort((a, b) => b.id - a.id) // newest first
      .forEach((order) => {
        let total = order.items.reduce((s, it) => s + it.price * it.qty, 0);
        const step = getOrderStep(order.time);

        html += `
        <div class="order-card">
          <div class="order-header">
            <h3>Order #${order.id}</h3>
            <p><strong>Date:</strong> ${new Date(order.time).toLocaleString()}</p>
            <p><strong>Payment:</strong> ${order.method}</p>
          </div>

          <!-- Timeline -->
          <div class="order-timeline">
            <div class="timeline-step ${step >= 1 ? "active" : ""}">Processing</div>
            <div class="timeline-line ${step >= 2 ? "active" : ""}"></div>
            <div class="timeline-step ${step >= 2 ? "active" : ""}">Shipped</div>
            <div class="timeline-line ${step >= 3 ? "active" : ""}"></div>
            <div class="timeline-step ${step >= 3 ? "active" : ""}">Delivered</div>
          </div>

          <div class="order-items">
            ${order.items
              .map(
                (it) => `
              <div class="order-item">
                <span>${it.name} (x${it.qty})</span>
                <span>${money(it.price * it.qty)}</span>
              </div>`
              )
              .join("")}
          </div>

          <div class="order-total"><strong>Total: ${money(total)}</strong></div>
        </div>
        `;
      });
    orderBox.innerHTML = html;
  }
}
