// Initialize cart if it doesn't exist
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(name, price) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show confirmation
   
}

// Function to update cart count in header
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

// Function to render cart items
function renderCart() {
    const cartItemsList = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('subtotal');
    const gstEl = document.getElementById('gst');
    const totalEl = document.getElementById('total');
    
    if (!cartItemsList) return; // Exit if not on cart page
    
    // Clear existing items
    cartItemsList.innerHTML = '';
    
    let subtotal = 0;
    let gstTotal = 0;
    
    // Add each item to the cart
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        const itemGST = itemTotal * 0.125; // 12.5% GST
        const itemPriceBeforeGST = itemTotal - itemGST;
        
        subtotal += itemTotal;
        gstTotal += itemGST;
        
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="cart-item">
                <div class="item-name">${item.name}</div>
                <div class="item-details">
                    <div class="price-row">
                        <span class="price-label">Price:</span>
                        <span class="price-value">$${itemPriceBeforeGST.toFixed(2)}</span>
                    </div>
                    <div class="gst-row">
                        <span class="gst-label">GST (12.5%):</span>
                        <span class="gst-value">$${itemGST.toFixed(2)}</span>
                    </div>
                    <div class="quantity-row">
                        <span class="quantity-label">Quantity:</span>
                        <span class="quantity-value">${item.quantity}</span>
                    </div>
                    <div class="item-total-row">
                        <span class="total-label">Item Total:</span>
                        <span class="total-value">$${itemTotal.toFixed(2)}</span>
                    </div>
                </div>
                <button class="remove-item" data-index="${index}">×</button>
            </div>
        `;
        cartItemsList.appendChild(li);
    });
    
    // Calculate totals
    const total = subtotal;
    const subtotalBeforeGST = subtotal - gstTotal;
    
    // Update totals display
    subtotalEl.textContent = `$${subtotalBeforeGST.toFixed(2)}`;
    gstEl.textContent = `$${gstTotal.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
        });
    });
}

// Function to handle payment form submission
function setupPaymentForm() {
    const paymentForm = document.getElementById('payment-form');
    if (!paymentForm) return;
    
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show confirmation modal
        document.querySelector('.modal').style.display = 'flex';
    });
    
    // Confirm payment button
    document.getElementById('confirm-payment').addEventListener('click', function() {
        // Process payment (in a real app, this would connect to a payment processor)
        
        
        // Clear cart
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Hide modal and refresh cart display
        document.querySelector('.modal').style.display = 'none';
        renderCart();
    });
    
    // Cancel payment button
    document.getElementById('cancel-payment').addEventListener('click', function() {
        document.querySelector('.modal').style.display = 'none';
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    renderCart();
    setupPaymentForm();
    
    // Make addToCart available globally
    window.addToCart = addToCart;
});


//icons card//
document.getElementById('card-number').addEventListener('input', function(e) {
  const cardNumber = e.target.value.replace(/\s+/g, '');
  const visaIcon = document.getElementById('visa-icon');
  const mastercardIcon = document.getElementById('mastercard-icon');
  const amexIcon = document.getElementById('amex-icon');

  // Hide all icons first
  [visaIcon, mastercardIcon, amexIcon].forEach(icon => {
    icon.classList.remove('visible');
    icon.classList.add('hidden');
  });

  // Show only the matching card icon
  if (/^4/.test(cardNumber)) {
    visaIcon.classList.remove('hidden');
    visaIcon.classList.add('visible');
  } 
  else if (/^5[1-5]/.test(cardNumber)) {
    mastercardIcon.classList.remove('hidden');
    mastercardIcon.classList.add('visible');
  } 
  else if (/^3[47]/.test(cardNumber)) {
    amexIcon.classList.remove('hidden');
    amexIcon.classList.add('visible');
  }
});



















