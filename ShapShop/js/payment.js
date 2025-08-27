/*document.addEventListener("DOMContentLoaded", () => {
  const addrBox = document.getElementById("paymentAddress");
  const selected = JSON.parse(localStorage.getItem("selectedAddress"));
  const payForm = document.getElementById("payForm");

  if (selected) {
    addrBox.innerHTML = `
      <h3>Delivery To:</h3>
      <p>${selected.street}, ${selected.city}, ${selected.state} - ${selected.zip}</p>
    `;
  } else {
    addrBox.innerHTML = "<p>No address selected.</p>";
  }

  payForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const method = document.getElementById("paymentMethod").value;
    if (!method) {
      alert("Please select a payment method");
      return;
    }

    // Get cart + address
    const cart = JSON.parse(localStorage.getItem("shapshopCart")) || [];
    if (cart.length === 0) {
      alert("Cart is empty!");
      window.location.href = "cart.html";
      return;
    }
    const address = JSON.parse(localStorage.getItem("selectedAddress"));




    // Create order
    const newOrder = {
      id: Date.now(),
      items: cart,
      address: address,
      method: method,
      status: "Order Placed",
      date: new Date().toLocaleString(),
    };

    let orders = JSON.parse(localStorage.getItem("shapshopOrders")) || [];
    orders.push(newOrder);
    localStorage.setItem("shapshopOrders", JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem("shapshopCart");

    alert("Payment successful! Order placed.");
    window.location.href = "order-status.html";
  });
});






new version bottom and up is old 






document.addEventListener("DOMContentLoaded", () => {
  const addrBox = document.getElementById("paymentAddress");
  const summaryBox = document.getElementById("orderSummary");
  const payForm = document.getElementById("payForm");

  // Load selected address
  const selected = JSON.parse(localStorage.getItem("selectedAddress"));
  if (selected) {
    addrBox.innerHTML = `
      <h3>Delivery To:</h3>
      <p>${selected.street}, ${selected.city}, ${selected.state} - ${selected.zip}</p>
    `;
  } else {
    addrBox.innerHTML = "<p>No address selected.</p>";
  }

  // Load cart
  let cart = JSON.parse(localStorage.getItem("shapshopCart"));
  if (!cart || cart.length === 0) {
    summaryBox.innerHTML = "<p>Cart is empty. <a href='cart.html'>Go back</a></p>";
    return;
  }



  // Show order summary with total
  let total = 0;
  summaryBox.innerHTML = "<h3>Order Summary</h3><ul>";
  cart.forEach(item => {
    summaryBox.innerHTML += `<li>${item.name} - $${item.price}</li>`;
    total += item.price;
  });
  summaryBox.innerHTML += `</ul><p><strong>Total: $${total}</strong></p>`;

  // Handle payment
  payForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const method = document.getElementById("paymentMethod").value;
    if (!method) {
      alert("Please select a payment method");
      return;
    }

    // Create order
    const newOrder = {
      id: Date.now(),
      items: cart,
      address: selected,
      method: method,
      status: "Order Placed",
      date: new Date().toLocaleString(),
      total: total,
    };

    let orders = JSON.parse(localStorage.getItem("shapshopOrders")) || [];
    orders.push(newOrder);
    localStorage.setItem("shapshopOrders", JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem("shapshopCart");

    alert("Payment successful! Order placed.");
    window.location.href = "order-status.html";
  });
});

*/


/*
document.addEventListener("DOMContentLoaded", () => {
  const addrBox = document.getElementById("paymentAddress");
  const summaryBox = document.getElementById("orderSummary");
  const payForm = document.getElementById("payForm");

  // Load selected address
  const selected = JSON.parse(localStorage.getItem("selectedAddress"));
  if (selected) {
    addrBox.innerHTML = `
      <h3>Delivery To:</h3>
      <p>${selected.street}, ${selected.city}, ${selected.state} - ${selected.zip}</p>
    `;
  } else {
    addrBox.innerHTML = "<p>No address selected.</p>";
  }

  // Load cart
  let cart = JSON.parse(localStorage.getItem("shapshopCart"));
  if (!cart || cart.length === 0) {
    summaryBox.innerHTML = "<p>Cart is empty. <a href='cart.html'>Go back</a></p>";
    return;
  }

  // Show order summary with total
  let total = 0;
  summaryBox.innerHTML = "<h3>Order Summary</h3><ul>";
  cart.forEach(item => {
    const qty = item.quantity || 1;
    const itemTotal = item.price * qty;
    summaryBox.innerHTML += `<li>${item.name} (x${qty}) - $${itemTotal}</li>`;
    total += itemTotal;
  });
  summaryBox.innerHTML += `</ul><p><strong>Total: $${total}</strong></p>`;

  // Handle payment
  payForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const method = document.getElementById("paymentMethod").value;
    if (!method) {
      alert("Please select a payment method");
      return;
    }

    // Create order
    const newOrder = {
      id: Date.now(),
      items: cart,
      address: selected,
      method: method,
      status: "Order Placed",
      date: new Date().toLocaleString(),
      total: total,
    };

    let orders = JSON.parse(localStorage.getItem("shapshopOrders")) || [];
    orders.push(newOrder);
    localStorage.setItem("shapshopOrders", JSON.stringify(orders));

    // Clear cart after payment
    localStorage.removeItem("shapshopCart");

    alert("Payment successful! Order placed.");
    window.location.href = "order-status.html";
  });
});
*/



/*

// === Payment Page Logic ===
const CART_KEY = "shap_shop_cart";

function readCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

function money(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

document.addEventListener("DOMContentLoaded", () => {
  const addressBox = document.getElementById("paymentAddress");
  const summaryBox = document.getElementById("orderSummary");
  const payForm = document.getElementById("payForm");

  // --- Address ---
  const selectedAddr = JSON.parse(localStorage.getItem("selectedAddress") || "null");
  if (addressBox) {
    if (selectedAddr) {
      addressBox.innerHTML = `
        <h2>Delivery Address</h2>
        <p>${selectedAddr.street}, ${selectedAddr.city}, ${selectedAddr.state} - ${selectedAddr.zip}</p>
      `;
    } else {
      addressBox.innerHTML = `<p>No address selected. <a href="profile.html">Add one</a></p>`;
    }
  }

  // --- Cart Summary ---
  const cart = readCart();
  if (summaryBox) {
    if (cart.length === 0) {
      summaryBox.innerHTML = `<p>Your cart is empty. <a href="cart.html">Go back</a></p>`;
    } else {
      let html = `<h2>Order Summary</h2>`;
      let total = 0;
      cart.forEach((it) => {
        const line = it.price * it.qty;
        total += line;
        html += `
          <div class="summary-item">
            <span>${it.name} (x${it.qty})</span>
            <span>${money(line)}</span>
          </div>
        `;
      });
      html += `<div class="summary-total"><strong>Total: ${money(total)}</strong></div>`;
      summaryBox.innerHTML = html;
    }
  }

  // --- Handle Pay ---
  if (payForm) {
    payForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const method = document.getElementById("paymentMethod").value;
      if (!method) {
        alert("Please select a payment method!");
        return;
      }

      // simulate successful payment
      alert(`Payment successful with ${method}!`);
      localStorage.removeItem(CART_KEY); // clear cart after order
      window.location.href = "order-status.html";
    });
  }
});

*/
// --- Page Protection ---
const loggedIn = localStorage.getItem("isLoggedIn");
if (loggedIn !== "true") {
  alert("Please login to access this page!");
  window.location.href = "login.html";
}





// === Payment.js ===

// Key must match your cart.js
const CART_KEY = "shap_shop_cart";

// Helpers
const money = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);
const readCart = () => JSON.parse(localStorage.getItem(CART_KEY) || "[]");

// DOM
const addrBox = document.getElementById("paymentAddress");
const summaryBox = document.getElementById("orderSummary");
const payForm = document.getElementById("payForm");

/* ------------ Render Address ------------ */
if (addrBox) {
  const addr = JSON.parse(localStorage.getItem("selectedAddress") || "null");
  if (addr) {
    addrBox.innerHTML = `
      <h2>Delivery Address</h2>
      <p>${addr.street}, ${addr.city}, ${addr.state} - ${addr.zip}</p>
    `;
  } else {
    addrBox.innerHTML = `<p>No address selected. <a href="profile.html">Add one</a></p>`;
  }
}

/* ------------ Render Order Summary ------------ */
if (summaryBox) {
  const cart = readCart();
  if (cart.length === 0) {
    summaryBox.innerHTML = `<p>Your cart is empty. <a href="cart.html">Go back</a></p>`;
  } else {
    let html = `<h2>Order Summary</h2>`;
    let total = 0;
    cart.forEach((it) => {
      const line = it.price * it.qty;
      total += line;
      html += `<div class="summary-item">
        <span>${it.name} (x${it.qty})</span>
        <span>${money(line)}</span>
      </div>`;
    });
    html += `<div class="summary-total"><strong>Total: ${money(total)}</strong></div>`;
    summaryBox.innerHTML = html;
  }
}

/* ------------ Handle Pay ------------ 
if (payForm) {
  payForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const method = document.getElementById("paymentMethod").value;
    if (!method) {
      alert("Please select a payment method!");
      return;
    }

    const cart = readCart();
    const address = JSON.parse(localStorage.getItem("selectedAddress") || "null");

    // save order before clearing cart
    const order = {
      items: cart,
      address,
      method,
      time: new Date().toISOString(),
    };
    localStorage.setItem("lastOrder", JSON.stringify(order));

    alert(`Payment successful with ${method}!`);
    localStorage.removeItem(CART_KEY); // clear cart after order
    window.location.href = "order-status.html";
  });
}*/

// --- Handle Pay ---
if (payForm) {
  payForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const method = document.getElementById("paymentMethod").value;
    if (!method) {
      alert("Please select a payment method!");
      return;
    }

    const cart = readCart();
    if (!cart.length) {
      alert("Cart is empty!");
      return;
    }

    const address = JSON.parse(localStorage.getItem("selectedAddress") || "null");

    const order = {
      id: Date.now(), // unique order id
      items: cart,
      address,
      method,
      time: new Date().toISOString(),
      status: "Confirmed ✅"
    };

    // Save last order
    localStorage.setItem("lastOrder", JSON.stringify(order));

    // Save order history
    const allOrders = JSON.parse(localStorage.getItem("shap_shop_orders") || "[]");
    allOrders.push(order);
    localStorage.setItem("shap_shop_orders", JSON.stringify(allOrders));

    alert(`Payment successful with ${method}!`);
    localStorage.removeItem(CART_KEY); // clear cart
    window.location.href = "order-status.html";
  });
}



