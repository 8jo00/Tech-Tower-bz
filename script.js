const countdown = () => {
  // Set the target date for the countdown
  const targetDate = new Date("June 11, 2025 00:00:00").getTime();
  const timer = document.getElementById("timer");

  // Function to update the timer display
  const updateTimer = () => {
    const now = new Date().getTime(); // Get the current date and time
    const distance = targetDate - now; // Calculate the distance to the target date

    // If the countdown is finished, display a message
    if (distance < 0) {
      clearInterval(interval); // Stop the timer
      timer.innerHTML = "Sale Live!"; // Display the sale message
      return;
    }

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the timer display
    timer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Update the timer every second
  const interval = setInterval(updateTimer, 1000);
  updateTimer(); // Initial call to display the timer immediately
};

// Call the countdown function when the page loads
window.onload = countdown;

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', countdown);









// ====================
// Subscription Form
// ====================
document.getElementById("subscribe-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("subscribe-email").value;
  
  if (email && email.includes("@")) {
    localStorage.setItem("subscribedEmail", email);
    const message = document.getElementById("subscription-message");
    if (message) {
      message.classList.add("visible");
      setTimeout(() => message.classList.remove("visible"), 10000);
    }
    document.getElementById("subscribe-email").value = "";
  } else {
   
  }
});

// ====================
// Entrance Animations
// ====================
const addEntranceAnimations = () => {
  const elements = document.querySelectorAll(".entrance, .newinv, .custom-pc-section");
  elements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    setTimeout(() => {
      element.style.transition = "opacity 1s ease, transform 1s ease";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 300);
  });
};

// ====================
// Modal Functionality
// ====================
const initializeModal = () => {
  const modal = document.querySelector(".modal");
  const confirmButton = document.getElementById("confirm-payment");
  const cancelButton = document.getElementById("cancel-payment");
  const paymentForm = document.getElementById("payment-form");

  if (!modal || !confirmButton || !cancelButton || !paymentForm) return;

  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
  });

  confirmButton.addEventListener("click", () => {
    modal.style.display = "none";
    paymentForm.reset();
  });

  cancelButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
};

// ====================
// Technician Modal
// ====================
const technicianModal = document.getElementById("technicianModal");
const askTechnicianBtn = document.getElementById("ask-technician");
const technicianForm = document.getElementById("technicianForm");

askTechnicianBtn?.addEventListener("click", () => {
  technicianModal.style.display = "flex";
  document.body.style.overflow = "hidden";
});

technicianForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("clientName").value;
  const number = document.getElementById("whatsappNumber").value;
  
  localStorage.setItem("technicianRequest", JSON.stringify({
    name,
    number,
    timestamp: new Date().toISOString()
  }));
  
  technicianModal.style.display = "none";
  document.body.style.overflow = "auto";
});

// ====================
// Custom PC Builder
// ====================
const componentPrices = {
  processor: { "i9": 1200, "ryzen7": 800, "ryzen9": 1000 },
  ram: { "16gb": 200, "32gb": 350, "64gb": 600 },
  storage: { "500gb": 150, "1tb": 250, "2tb": 400 },
  chassis: { "mid-tower": 300, "full-tower": 450, "mini-itx": 400 }
};

const updateEstimatedTotal = () => {
  const processor = document.getElementById("processor").value;
  const ram = document.getElementById("ram").value;
  const storage = document.getElementById("storage").value;
  const chassis = document.getElementById("chassis").value;
  
  const subtotal = (componentPrices.processor[processor] || 0) + 
                   (componentPrices.ram[ram] || 0) + 
                   (componentPrices.storage[storage] || 0) + 
                   (componentPrices.chassis[chassis] || 0);
  
  document.getElementById("custom-pc-total").textContent = `$${subtotal.toFixed(2)} BZD`;
};

// Initialize event listeners for PC components
["processor", "ram", "storage", "chassis"].forEach(id => {
  document.getElementById(id)?.addEventListener("change", updateEstimatedTotal);
});

// ====================
// Initialize Everything
// ====================
document.addEventListener("DOMContentLoaded", () => {
  countdown();
  addEntranceAnimations();
  initializeModal();

  // Search functionality
  const searchButton = document.querySelector(".search-bar button");
  const searchInput = document.getElementById('search-input');
  
  if (searchButton) searchButton.addEventListener("click", searchProduct);
  if (searchInput) searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchProduct();
  });

  // Cart initialization
  if (window.location.pathname.includes("cart.html")) {
    loadCartItems();
  }
});




