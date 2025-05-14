// filter.js
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

  // Product categories from your items
  const categories = ['RAM', 'SSD', 'PC', 'Power Bank', 'Monitor', 'Accessories'];

  // Populate category options
  categories.forEach(category => {
      const option = document.createElement('div');
      option.className = 'category-option';
      option.innerHTML = `
          <input type="checkbox" id="cat-${category.toLowerCase().replace(' ', '-')}" 
                 name="category" value="${category}" checked>
          <label for="cat-${category.toLowerCase().replace(' ', '-')}">${category}</label>
      `;
      categoryOptions.appendChild(option);
  });

  // Toggle filter menu
  filterButton.addEventListener('click', function() {
      filterMenu.style.display = 'block';
      filterOverlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
  });

  // Close filter menu
  function closeFilterMenu() {
      filterMenu.style.display = 'none';
      filterOverlay.style.display = 'none';
      document.body.style.overflow = '';
  }

  closeFilter.addEventListener('click', closeFilterMenu);
  filterOverlay.addEventListener('click', closeFilterMenu);

  // Create increment/decrement buttons for price inputs
  function createPriceControls(input) {
      const controls = document.createElement('div');
      controls.className = 'price-input-controls';
      
      const incrementBtn = document.createElement('button');
      incrementBtn.type = 'button'; // Prevent form submission
      incrementBtn.className = 'price-input-btn';
      incrementBtn.innerHTML = `
          <svg viewBox="0 0 24 24">
              <path d="M7 14l5-5 5 5z"/>
          </svg>
      `;
      incrementBtn.addEventListener('click', () => {
          input.stepUp();
          input.dispatchEvent(new Event('change'));
      });
      
      const decrementBtn = document.createElement('button');
      decrementBtn.type = 'button'; // Prevent form submission
      decrementBtn.className = 'price-input-btn';
      decrementBtn.innerHTML = `
          <svg viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z"/>
          </svg>
      `;
      decrementBtn.addEventListener('click', () => {
          input.stepDown();
          input.dispatchEvent(new Event('change'));
      });
      
      controls.appendChild(incrementBtn);
      controls.appendChild(decrementBtn);
      input.parentNode.appendChild(controls);
  }

  // Add controls to both price inputs
  createPriceControls(minPriceInput);
  createPriceControls(maxPriceInput);

  // Main filtering function
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
          
          // Check if category is selected (show all if none selected)
          const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(category);
          
          // Show or hide based on both conditions
          item.style.display = (priceMatch && categoryMatch) ? 'block' : 'none';
      });
  }

  // Apply filters when button clicked
  applyFilters.addEventListener('click', function() {
      applyProductFilters();
      closeFilterMenu();
  });

  // Also apply filters when price changes using increment/decrement
  minPriceInput.addEventListener('change', function() {
      if (parseFloat(this.value) > parseFloat(maxPriceInput.value)) {
          this.value = maxPriceInput.value;
      }
      applyProductFilters();
  });

  maxPriceInput.addEventListener('change', function() {
      if (parseFloat(this.value) < parseFloat(minPriceInput.value)) {
          this.value = minPriceInput.value;
      }
      applyProductFilters();
  });

  // Apply filters when category selection changes
  document.querySelectorAll('.category-option input').forEach(checkbox => {
      checkbox.addEventListener('change', applyProductFilters);
  });

  // Reset filters when menu is opened
  filterButton.addEventListener('click', function() {
      minPriceInput.value = '';
      maxPriceInput.value = '';
      document.querySelectorAll('.category-option input').forEach(checkbox => {
          checkbox.checked = true;
      });
  });
});



