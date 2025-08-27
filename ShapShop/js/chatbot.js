// Sample orders stored in localStorage
const ORDERS_KEY = "orderBox";

// Sample data (replace with real orders if you connect backend)
if (!localStorage.getItem(ORDERS_KEY)) {
  const sampleOrders = [
    { id: "ORD123", product: "Laptop Pro 14", status: "Shipped" },
    { id: "ORD124", product: "Smartphone X", status: "Processing" },
    { id: "ORD125", product: "Smartwatch", status: "Delivered" }
  ];
  localStorage.setItem(ORDERS_KEY, JSON.stringify(sampleOrders));
}

// Function to read orders
const getOrders = () => JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");


const chatbotBtn = document.getElementById("chatbot-btn");
const chatbotContainer = document.getElementById("chatbot-container");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotInput = document.getElementById("chatbot-input");

// Toggle chatbot visibility
chatbotBtn.addEventListener("click", () => {
  chatbotContainer.style.display =
    chatbotContainer.style.display === "flex" ? "none" : "flex";
  chatbotContainer.style.flexDirection = "column";
  chatbotInput.focus();
});

const responses = [
  
  {
    keywords: ["hello", "hi", "hey", "good morning", "good evening"],
    answer: "Hello! 👋 Welcome to Shap Shop. How can I help you today?"
  },
  {
    keywords: ["how are you", "how r u", "how do you do"],
    answer: "I’m doing great, thank you! 😊 How can I assist you today?"
  },
  {
    keywords: ["shipping", "delivery"],
    answer: "Our standard delivery time is 3-5 business days."
  },
  {
    keywords: ["order", "status", "track"],
    answer: "You can check your order status in your Profile → Orders."
  },
  {
    keywords: ["cancel", "returns"],
    answer: "To cancel or return an order, go to your Profile → Orders and select the order."
  },
  {
    keywords: ["product", "products", "items", "catalog"],
    answer: "You can browse our products in the Categories or Offers section. Do you want me to show electronics, fashion, or something else?"
  },
  {
    keywords: ["cart", "my cart", "view cart"],
    answer: "To view your cart, go to the Cart page 🛒. You’ll see all the items you added."
  },
  {
    keywords: ["add to cart", "buy this", "purchase"],
    answer: "Simply click on 'Add to Cart' under any product and it will be added to your cart."
  },
  {
    keywords: ["checkout", "buy now", "proceed to pay"],
    answer: "Go to the Cart page, select your address, and click 'Proceed to Pay' to complete your order ✅."
  },
  {
    keywords: ["track order", "my order", "order status"],
    answer: "You can track your order from the Profile → Orders page 📦."
  },
  {
    keywords: ["payment", "pay", "payment method", "upi", "cod"],
    answer: "We support multiple payment methods including UPI, Debit/Credit cards, and Cash on Delivery 💳."
  },
  {
    keywords: ["address", "delivery address", "change address"],
    answer: "You can add or update your delivery address in the Profile → Address section 🏠."
  },
  {
    keywords: ["refund", "return", "cancel order"],
    answer: "You can request a return or cancellation within 7 days of delivery. Refunds will be processed to your original payment method 💸."
  },
  {
    keywords: ["policy", "terms", "privacy"],
    answer: "You can read our Terms & Conditions and Privacy Policy at the bottom of any page 📑."
  },
  {
    keywords: ["help", "support", "customer care", "contact"],
    answer: "Need help? You can reach us through the Help page or email support@shapshop.com 📧."
  },
  {
    keywords: ["about", "who are you", "what is shap shop"],
    answer: "Shap Shop is your trusted online shopping platform for electronics, fashion, and more 🛍️."
  },
  {
    keywords: ["bye", "goodbye", "see you", "thanks", "thank you"],
    answer: "You're welcome! Have a great day 🌟. Visit Shap Shop again soon!"
  }

];

chatbotInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const userText = chatbotInput.value.trim();
    if (!userText) return;

    // Display user message
    const userMsgDiv = document.createElement("div");
    userMsgDiv.className = "message user-msg";
    userMsgDiv.textContent = userText;
    chatbotMessages.appendChild(userMsgDiv);

    chatbotInput.value = "";

    const lowerText = userText.toLowerCase();
    let matched = false;

    // Check dynamic order questions
    const orders = getOrders();
    if (lowerText.includes("order") && lowerText.match(/\b(ord\d+)\b/i)) {
      const orderId = lowerText.match(/\b(ord\d+)\b/i)[1].toUpperCase();
      const order = orders.find(o => o.id === orderId);
      const botMsgDiv = document.createElement("div");
      botMsgDiv.className = "message bot-msg";
      botMsgDiv.textContent = order
        ? `Your order ${order.id} for ${order.product} is currently: ${order.status}.`
        : `Sorry, I couldn't find any order with ID ${orderId}.`;
      chatbotMessages.appendChild(botMsgDiv);
      matched = true;
    }

    // Check keyword-based static responses
    if (!matched) {
      for (const resp of responses) {
        if (resp.keywords.some(k => lowerText.includes(k))) {
          const botMsgDiv = document.createElement("div");
          botMsgDiv.className = "message bot-msg";
          botMsgDiv.textContent = resp.answer;
          chatbotMessages.appendChild(botMsgDiv);
          matched = true;
          break;
        }
      }
    }

    // Default fallback
    if (!matched) {
      const botMsgDiv = document.createElement("div");
      botMsgDiv.className = "message bot-msg";
      botMsgDiv.textContent = "Sorry, I didn't understand that. Can you rephrase?";
      chatbotMessages.appendChild(botMsgDiv);
    }

    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
});

// Handle user input
chatbotInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const userText = chatbotInput.value.trim();
    if (!userText) return;

    // Display user message
    const userMsgDiv = document.createElement("div");
    userMsgDiv.className = "message user-msg";
    userMsgDiv.textContent = userText;
    chatbotMessages.appendChild(userMsgDiv);

    // Clear input
    chatbotInput.value = "";

    // Generate bot response
    let matched = false;
    const lowerText = userText.toLowerCase();
    for (const resp of responses) {
      if (resp.keywords.some(k => lowerText.includes(k))) {
        const botMsgDiv = document.createElement("div");
        botMsgDiv.className = "message bot-msg";
        botMsgDiv.textContent = resp.answer;
        chatbotMessages.appendChild(botMsgDiv);
        matched = true;
        break;
      }
    }

    // Default response if no match
    if (!matched) {
      const botMsgDiv = document.createElement("div");
      botMsgDiv.className = "message bot-msg";
      botMsgDiv.textContent = "Sorry, I didn't understand that. Can you rephrase?";
      chatbotMessages.appendChild(botMsgDiv);
    }

    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
});


