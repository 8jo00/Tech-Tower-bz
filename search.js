

// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.querySelector('.cart-count');

function updateCartCount() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
}

// Initialize cart count on page load
updateCartCount();

// Search Functionality
function searchProduct() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    if (searchTerm === '') {
        // If search is empty, show all products
        document.querySelectorAll('.desktop-item').forEach(item => {
            item.style.display = 'block';
        });
        const noResultsMsg = document.getElementById('no-results-message');
        if (noResultsMsg) noResultsMsg.remove();
        return;
    }
    
    filterProducts(searchTerm);
}

// Enhanced filter function
function filterProducts(searchTerm = '', category = 'all', minPrice = 0, maxPrice = Infinity) {
    const products = document.querySelectorAll('.desktop-item');
    let hasVisibleProducts = false;

    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        const productDesc = product.querySelector('p').textContent.toLowerCase();
        const productCategory = product.dataset.name.toLowerCase();
        const productPrice = parseFloat(product.querySelector('span').textContent.replace(/[^0-9.]/g, ''));
        
        const matchesSearch = productName.includes(searchTerm) || productDesc.includes(searchTerm);
        const matchesCategory = category === 'all' || productCategory === category.toLowerCase();
        const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;
        
        if (matchesSearch && matchesCategory && matchesPrice) {
            product.style.display = 'block';
            hasVisibleProducts = true;
        } else {
            product.style.display = 'none';
        }
    });

    // Show message if no products match filters
    let noResultsMessage = document.getElementById('no-results-message');
    if (!hasVisibleProducts) {
        if (!noResultsMessage) {
            noResultsMessage = document.createElement('p');
            noResultsMessage.id = 'no-results-message';
            noResultsMessage.style.textAlign = 'center';
            noResultsMessage.style.margin = '20px 0';
            noResultsMessage.style.fontSize = '1.2rem';
            noResultsMessage.style.color = '#ff0000';
            document.querySelector('.desktopgrid').appendChild(noResultsMessage);
        }
        noResultsMessage.textContent = 'No products match your search criteria.';
    } else if (noResultsMessage) {
        noResultsMessage.remove();
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up search input event listeners
    const searchInput = document.getElementById('search-input');
    
    // Search when Enter is pressed
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProduct();
        }
    });
    
    // Search when search button is clicked
    document.querySelector('.search-bar button').addEventListener('click', searchProduct);
    
    // Set up filter button
    const filterButton = document.getElementById('filter-button');
    const filterMenu = document.getElementById('filter-menu');
    const closeFilter = document.getElementById('close-filter');
    
    filterButton.addEventListener('click', function() {
        filterMenu.style.display = filterMenu.style.display === 'block' ? 'none' : 'block';
    });
    
    closeFilter.addEventListener('click', function() {
        filterMenu.style.display = 'none';
    });
    
    // Set up category filter options
    const categories = new Set();
    document.querySelectorAll('.desktop-item').forEach(item => {
        categories.add(item.dataset.name);
    });
    
    const categoryContainer = document.querySelector('.category-options');
    categoryContainer.innerHTML = '';
    
    // Add "All" option
    const allOption = document.createElement('div');
    allOption.className = 'category-option';
    allOption.innerHTML = `
        <input type="radio" id="category-all" name="category" value="all" checked>
        <label for="category-all">All Categories</label>
    `;
    categoryContainer.appendChild(allOption);
    
    // Add other categories
    categories.forEach(category => {
        const option = document.createElement('div');
        option.className = 'category-option';
        option.innerHTML = `
            <input type="radio" id="category-${category}" name="category" value="${category}">
            <label for="category-${category}">${category}</label>
        `;
        categoryContainer.appendChild(option);
    });
    
    // Apply filters when button is clicked
    document.getElementById('apply-filters').addEventListener('click', function() {
        const selectedCategory = document.querySelector('input[name="category"]:checked').value;
        const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
        const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        filterProducts(searchTerm, selectedCategory, minPrice, maxPrice);
        filterMenu.style.display = 'none';
    });
    
    // Initialize all products as visible
    filterProducts();
});
