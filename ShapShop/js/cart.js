// === Load Address in Cart ===
/*const addressSelect = document.getElementById("addressSelect");
if (addressSelect) {
  const savedAddress = JSON.parse(localStorage.getItem("shapshopAddress"));
  if (savedAddress) {
    addressSelect.innerHTML = `
      <p>${savedAddress.street}, ${savedAddress.city}, ${savedAddress.state} - ${savedAddress.zip}</p>
    `;
  } else {
    addressSelect.innerHTML = `<p>No address saved. <a href="address.html">Add Address</a></p>`;
  }
}


// === Checkout Button ===
const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    const savedAddress = localStorage.getItem("shapshopAddress");
    if (!savedAddress) {
      alert("Please add an address first!");
      window.location.href = "address.html";
      return;
    }
    window.location.href = "payment.html";
  });
}

*/

// === Checkout Button ===
const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    const addresses = JSON.parse(localStorage.getItem("shapshopAddresses")) || [];
    if (addresses.length === 0) {
      alert("Please add an address first!");
      window.location.href = "address.html";
      return;
    }

    const selectedIndex = addressDropdown.value;
    if (selectedIndex === "") {
      alert("Please select an address!");
      return;
    }

    localStorage.setItem("selectedAddress", JSON.stringify(addresses[selectedIndex]));
    window.location.href = "payment.html";
  });
}





// === Load Multiple Addresses in Cart ===
const addressDropdown = document.getElementById("addressDropdown");
if (addressDropdown) {
  const addresses = JSON.parse(localStorage.getItem("shapshopAddresses")) || [];
  if (addresses.length === 0) {
    addressDropdown.innerHTML = `<option value="">No addresses saved</option>`;
  } else {
    addresses.forEach((addr, idx) => {
      let opt = document.createElement("option");
      opt.value = idx;
      opt.textContent = `${addr.street}, ${addr.city}, ${addr.state} - ${addr.zip}`;
      addressDropdown.appendChild(opt);
    });
  }
}



/*document.addEventListener("DOMContentLoaded", () => {
  const cartItemsBox = document.getElementById("cartItems");
  const totalBox = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const addressDropdown = document.getElementById("addressDropdown");

  // === Load Cart from localStorage ===
  let cart = JSON.parse(localStorage.getItem("shapshopCart")) || [];

  function renderCart() {
    cartItemsBox.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItemsBox.innerHTML = "<p>Your cart is empty.</p>";
      totalBox.innerHTML = "";
      return;
    }

    cart.forEach((item, index) => {
      total += item.price * (item.quantity || 1);

      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <span>${item.name} - $${item.price}</span>
        <div class="cart-controls">
          <button class="decrease" data-index="${index}">-</button>
          <span>${item.quantity || 1}</span>
          <button class="increase" data-index="${index}">+</button>
          <button class="remove" data-index="${index}">Remove</button>
        </div>
      `;
      cartItemsBox.appendChild(div);
    });

    totalBox.innerHTML = `<h3>Total: $${total}</h3>`;
    localStorage.setItem("shapshopCart", JSON.stringify(cart));
  }

  renderCart();

  // === Quantity Controls & Remove ===
  cartItemsBox.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-index");
    if (e.target.classList.contains("increase")) {
      cart[index].quantity = (cart[index].quantity || 1) + 1;
    }
    if (e.target.classList.contains("decrease")) {
      if ((cart[index].quantity || 1) > 1) {
        cart[index].quantity -= 1;
      }
    }
    if (e.target.classList.contains("remove")) {
      cart.splice(index, 1);
    }
    renderCart();
  });

  // === Load Addresses into Dropdown ===
  let addresses = JSON.parse(localStorage.getItem("shapshopAddresses")) || [];
  addressDropdown.innerHTML = "<option value=''>Select Address</option>";
  addresses.forEach((addr, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${addr.street}, ${addr.city}`;
    addressDropdown.appendChild(opt);
  });

  // === Proceed to Payment ===
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      const selectedIndex = addressDropdown.value;
      if (selectedIndex === "") {
        alert("Please select an address first!");
        return;
      }

      const selectedAddress = addresses[selectedIndex];
      localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));

      // ✅ Do NOT clear cart here — payment page still needs it
      window.location.href = "payment.html";
    });
  }
});
*/