document.addEventListener('DOMContentLoaded', function() {
  // Filter system elements
  const filterButton = document.getElementById('filter-button');
  const filterMenu = document.getElementById('filter-menu');
  const closeFilter = document.getElementById('close-filter');
  const applyFilters = document.getElementById('apply-filters');
  const minPriceInput = document.getElementById('min-price');
  const maxPriceInput = document.getElementById('max-price');
  const categoryOptions = document.querySelector('.category-options');
  const filterOverlay = document.createElement('div');
  filterOverlay.className = 'filter-overlay';
  document.body.appendChild(filterOverlay);

  // Get unique categories from existing products
  const existingCategories = new Set();
  document.querySelectorAll('.desktop-item').forEach(item => {
    const category = item.getAttribute('data-name');
    if (category) existingCategories.add(category);
  });
  const categories = Array.from(existingCategories);

  // Clear existing options before populating
  categoryOptions.innerHTML = '';

  // Populate category options with unique categories (UNCHECKED by default)
  categories.forEach(category => {
    const option = document.createElement('div');
    option.className = 'category-option';
    option.innerHTML = `
      <input type="checkbox" id="cat-${category.toLowerCase().replace(' ', '-')}" 
             name="category" value="${category}"> <!-- Removed 'checked' attribute -->
      <label for="cat-${category.toLowerCase().replace(' ', '-')}">${category}</label>
    `;
    categoryOptions.appendChild(option);
  });

  // [Rest of your existing code remains the same until the filtering function]

  // Main filtering function - MODIFIED to show all when no categories selected
  function applyProductFilters() {
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
    
    const selectedCategories = [];
    document.querySelectorAll('.category-option input:checked').forEach(checkbox => {
      selectedCategories.push(checkbox.value);
    });

    // Filter products
    document.querySelectorAll('.desktop-item').forEach(item => {
      const priceText = item.querySelector('span').textContent;
      const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
      const category = item.getAttribute('data-name');
      
      // Check if price is within range
      const priceMatch = price >= minPrice && price <= maxPrice;
      
      // Show all if no categories selected, otherwise filter by selected categories
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(category);
      
      item.style.display = (priceMatch && categoryMatch) ? 'block' : 'none';
    });
  }

  // [Rest of your existing event listeners remain the same]

  // Modified reset behavior - now sets checkboxes to UNCHECKED when opening
  filterButton.addEventListener('click', function() {
    minPriceInput.value = '';
    maxPriceInput.value = '';
    document.querySelectorAll('.category-option input').forEach(checkbox => {
      checkbox.checked = false; // Changed from true to false
    });
  });
});




document.addEventListener('DOMContentLoaded', function() {
  // [Previous code remains the same until the createPriceControls function]

  // Modern increment/decrement buttons for price inputs
  function createPriceControls(input) {
    const wrapper = document.createElement('div');
    wrapper.className = 'price-input-wrapper';
    
    // Move the existing input into our wrapper
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);
    
    // Create button container
    const buttons = document.createElement('div');
    buttons.className = 'price-input-buttons';
    
    // Increment button
    const incrementBtn = document.createElement('button');
    incrementBtn.type = 'button';
    incrementBtn.className = 'price-input-btn increment';
    incrementBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="12" height="12">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
    `;
    incrementBtn.addEventListener('click', () => {
      input.stepUp();
      input.dispatchEvent(new Event('change'));
    });
    
    // Decrement button
    const decrementBtn = document.createElement('button');
    decrementBtn.type = 'button';
    decrementBtn.className = 'price-input-btn decrement';
    decrementBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="12" height="12">
        <path d="M19 13H5v-2h14v2z"/>
      </svg>
    `;
    decrementBtn.addEventListener('click', () => {
      input.stepDown();
      input.dispatchEvent(new Event('change'));
    });
    
    buttons.appendChild(decrementBtn);
    buttons.appendChild(incrementBtn);
    wrapper.appendChild(buttons);
  }

  // [Rest of your code remains the same]
});