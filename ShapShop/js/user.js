// === Register ===
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    localStorage.setItem("shapshopUser", JSON.stringify(user));
    alert("Registration successful! Please login.");
    window.location.href = "login.html";
  });
}

// === Login ===
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const user = JSON.parse(localStorage.getItem("shapshopUser"));
    if (user && user.email === email && user.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      alert("Login successful!");
      window.location.href = "profile.html";
    } else {
      alert("Invalid credentials!");
    }
  });
}


// === Profile Page ===
const profileInfo = document.getElementById("profileInfo");
const profileActions = document.querySelector(".profile-actions");
if (profileInfo) {
  const user = JSON.parse(localStorage.getItem("shapshopUser"));
  const loggedIn = localStorage.getItem("isLoggedIn");

  if (user && loggedIn === "true") {
    // User is logged in
    profileInfo.innerHTML = `
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
    `;
    if (profileActions) profileActions.style.display = "flex"; // show buttons
  } else {
    // User is not logged in
    profileInfo.innerHTML = `
      <p>Please login or register to access your profile.</p>
      <a href="login.html" class="btn">Login</a>
      <a href="register.html" class="btn">Register</a>
    `;
    if (profileActions) profileActions.style.display = "none"; // hide buttons
  }
}



// === Logout ===
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    alert("Logged out!");
    window.location.href = "login.html";
  });
}

// === Settings Page ===
const settingsForm = document.getElementById("settingsForm");
if (settingsForm) {
  const user = JSON.parse(localStorage.getItem("shapshopUser"));
  if (user) {
    document.getElementById("updateName").value = user.name;
    document.getElementById("updateEmail").value = user.email;
  }

  settingsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let updatedUser = {
      name: document.getElementById("updateName").value,
      email: document.getElementById("updateEmail").value,
      password: user.password, // keep old password unless changed
    };

    const newPass = document.getElementById("updatePassword").value;
    if (newPass.trim() !== "") {
      updatedUser.password = newPass;
    }

    localStorage.setItem("shapshopUser", JSON.stringify(updatedUser));
    alert("Profile updated successfully!");
    window.location.href = "profile.html";
  });
}


// === Address Page ===
const addressForm = document.getElementById("addressForm");
if (addressForm) {
  const addressListBox = document.getElementById("addressList");

  function renderAddresses() {
    const addresses = JSON.parse(localStorage.getItem("shapshopAddresses")) || [];
    addressListBox.innerHTML = "<h3>Saved Addresses:</h3>";

    if (addresses.length === 0) {
      addressListBox.innerHTML += "<p>No addresses saved yet.</p>";
      return;
    }

    addresses.forEach((addr, index) => {
      const div = document.createElement("div");
      div.classList.add("address-item");
      div.innerHTML = `
        <p>${addr.street}, ${addr.city}, ${addr.state} - ${addr.zip}</p>
        <button class="btn delete-btn" data-index="${index}">Delete</button>
      `;
      addressListBox.appendChild(div);
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        let addresses = JSON.parse(localStorage.getItem("shapshopAddresses")) || [];
        addresses.splice(e.target.dataset.index, 1);
        localStorage.setItem("shapshopAddresses", JSON.stringify(addresses));
        renderAddresses();
      });
    });
  }

  renderAddresses();

  addressForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newAddr = {
      street: document.getElementById("street").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      zip: document.getElementById("zip").value,
    };

    let addresses = JSON.parse(localStorage.getItem("shapshopAddresses")) || [];
    addresses.push(newAddr);
    localStorage.setItem("shapshopAddresses", JSON.stringify(addresses));

    addressForm.reset();
    renderAddresses();
  });
}




