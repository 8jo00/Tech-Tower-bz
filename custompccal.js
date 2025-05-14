// Custom PC Form Calculation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('custom-pc-form');
    const processorSelect = document.getElementById('processor');
    const ramSelect = document.getElementById('ram');
    const storageSelect = document.getElementById('storage');
    const chassisSelect = document.getElementById('chassis');
    const totalElement = document.getElementById('custom-pc-total');
    const proceedButton = document.getElementById('proceed-to-payment');
    
    // Calculate total function
    function calculateTotal() {
      const processorPrice = processorSelect.selectedOptions[0].dataset.price || 0;
      const ramPrice = ramSelect.selectedOptions[0].dataset.price || 0;
      const storagePrice = storageSelect.selectedOptions[0].dataset.price || 0;
      const chassisPrice = chassisSelect.selectedOptions[0].dataset.price || 0;
      
      const subtotal = parseInt(processorPrice) + parseInt(ramPrice) + 
                      parseInt(storagePrice) + parseInt(chassisPrice);
      
      totalElement.textContent = `$${subtotal.toFixed(2)} BZD`;
      
      // Enable/disable proceed button based on selection
      if (processorPrice > 0 && ramPrice > 0 && storagePrice > 0 && chassisPrice > 0) {
        proceedButton.disabled = false;
        proceedButton.style.opacity = 1;
        proceedButton.style.cursor = 'pointer';
      } else {
        proceedButton.disabled = true;
        proceedButton.style.opacity = 0.5;
        proceedButton.style.cursor = 'not-allowed';
      }
    }
    
    // Event listeners for select changes
    processorSelect.addEventListener('change', calculateTotal);
    ramSelect.addEventListener('change', calculateTotal);
    storageSelect.addEventListener('change', calculateTotal);
    chassisSelect.addEventListener('change', calculateTotal);
    
    // Proceed to payment button
    proceedButton.addEventListener('click', function() {
      if (this.disabled) return;
      
      // Get selected components
      const processor = processorSelect.options[processorSelect.selectedIndex].text;
      const ram = ramSelect.options[ramSelect.selectedIndex].text;
      const storage = storageSelect.options[storageSelect.selectedIndex].text;
      const chassis = chassisSelect.options[chassisSelect.selectedIndex].text;
      
      // Calculate prices
      const processorPrice = processorSelect.selectedOptions[0].dataset.price || 0;
      const ramPrice = ramSelect.selectedOptions[0].dataset.price || 0;
      const storagePrice = storageSelect.selectedOptions[0].dataset.price || 0;
      const chassisPrice = chassisSelect.selectedOptions[0].dataset.price || 0;
      
      const subtotal = parseInt(processorPrice) + parseInt(ramPrice) + 
                      parseInt(storagePrice) + parseInt(chassisPrice);
      const gst = subtotal * 0.125; // 12.5% GST
      const total = subtotal + gst;
      
      // Populate receipt
      const receipt = document.getElementById('custom-pc-receipt');
      receipt.innerHTML = `
        <div class="receipt-item">
          <span>${processor}</span>
          <span>$${parseFloat(processorPrice).toFixed(2)}</span>
        </div>
        <div class="receipt-item">
          <span>${ram}</span>
          <span>$${parseFloat(ramPrice).toFixed(2)}</span>
        </div>
        <div class="receipt-item">
          <span>${storage}</span>
          <span>$${parseFloat(storagePrice).toFixed(2)}</span>
        </div>
        <div class="receipt-item">
          <span>${chassis}</span>
          <span>$${parseFloat(chassisPrice).toFixed(2)}</span>
        </div>
      `;
      
      // Update totals
      document.getElementById('custom-subtotal').textContent = `$${subtotal.toFixed(2)}`;
      document.getElementById('custom-gst').textContent = `$${gst.toFixed(2)}`;
      document.getElementById('custom-total').textContent = `$${total.toFixed(2)}`;
      
      // Show modal
      document.getElementById('customPcModal').style.display = 'flex';
    });
    
    // Modal close buttons
    document.querySelectorAll('.close-modal').forEach(button => {
      button.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
      });
    });
    
    // Cancel payment button
    document.getElementById('cancel-custom-payment').addEventListener('click', function() {
      document.getElementById('customPcModal').style.display = 'none';
    });
    
    // Payment form submission
    document.getElementById('custom-pc-payment-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Here you would typically process the payment
      // For demo purposes, we'll just show the confirmation
      
      document.getElementById('customPcModal').style.display = 'none';
      document.getElementById('customPcConfirmation').style.display = 'flex';
    });
    
    // Done button
    document.getElementById('donex').addEventListener('click', function() {
      document.getElementById('customPcConfirmation').style.display = 'none';
      
      // Reset form
      form.reset();
      totalElement.textContent = '$0.00 BZD';
      proceedButton.disabled = true;
      proceedButton.style.opacity = 0.5;
      proceedButton.style.cursor = 'not-allowed';
    });
    
    // Initialize calculation
    calculateTotal();
  });