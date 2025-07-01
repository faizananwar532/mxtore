document.addEventListener('DOMContentLoaded', function() {
    // View Toggle (Grid/List)
    const viewOptions = document.querySelectorAll('.view-option');
    const productGrid = document.querySelector('.product-grid');
    
    viewOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            viewOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Change view based on data attribute
            const viewType = this.getAttribute('data-view');
            
            if (viewType === 'list') {
                productGrid.classList.add('list-view');
            } else {
                productGrid.classList.remove('list-view');
            }
        });
    });
    
    // Price Range Slider
    const priceSlider = document.getElementById('price-slider');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    
    if (priceSlider && minPriceInput && maxPriceInput) {
        // Update min price input when slider changes
        priceSlider.addEventListener('input', function() {
            const value = this.value;
            minPriceInput.value = '0';
            maxPriceInput.value = value;
        });
        
        // Apply button functionality
        const applyPriceBtn = document.getElementById('apply-price');
        if (applyPriceBtn) {
            applyPriceBtn.addEventListener('click', function() {
                // Here you would typically filter products based on price range
                // For now, we'll just log the values
                console.log(`Filtering products between $${minPriceInput.value || 0} and $${maxPriceInput.value || 1000}`);
                
                // You could trigger a function here to filter products
                filterProducts();
            });
        }
    }
    
    // Clear All Filters
    const clearFiltersBtn = document.getElementById('clear-filters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            // Reset all checkboxes and radio buttons
            document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            document.querySelectorAll('.filter-option input[type="radio"]').forEach(radio => {
                radio.checked = false;
            });
            
            // Reset price inputs
            if (minPriceInput && maxPriceInput) {
                minPriceInput.value = '';
                maxPriceInput.value = '';
                priceSlider.value = 500;
            }
            
            // Reset brand search
            const brandSearch = document.querySelector('.search-filter input');
            if (brandSearch) {
                brandSearch.value = '';
            }
            
            // Reset filters and show all products
            filterProducts();
        });
    }
    
    // Filter functionality for checkboxes and radio buttons
    const filterInputs = document.querySelectorAll('.filter-option input');
    filterInputs.forEach(input => {
        input.addEventListener('change', function() {
            filterProducts();
        });
    });
    
    // Brand search functionality
    const brandSearchInput = document.querySelector('.search-filter input');
    if (brandSearchInput) {
        brandSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const brandOptions = document.querySelectorAll('.filter-options.scrollable .filter-option');
            
            brandOptions.forEach(option => {
                const brandName = option.querySelector('span').textContent.toLowerCase();
                if (brandName.includes(searchTerm)) {
                    option.style.display = 'flex';
                } else {
                    option.style.display = 'none';
                }
            });
        });
    }
    
    // Product sorting functionality
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            console.log(`Sorting products by: ${sortValue}`);
            
            // Here you would sort the products based on the selected option
            sortProducts(sortValue);
        });
    }
    
    // Recently viewed slider functionality
    const recentSlider = document.querySelector('.recently-viewed-slider');
    if (recentSlider) {
        const prevBtn = recentSlider.querySelector('.slider-btn.prev');
        const nextBtn = recentSlider.querySelector('.slider-btn.next');
        const productsContainer = recentSlider.querySelector('.recently-viewed-products');
        
        if (prevBtn && nextBtn && productsContainer) {
            nextBtn.addEventListener('click', function() {
                productsContainer.scrollBy({
                    left: 250,
                    behavior: 'smooth'
                });
            });
            
            prevBtn.addEventListener('click', function() {
                productsContainer.scrollBy({
                    left: -250,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // Pagination functionality
    const paginationBtns = document.querySelectorAll('.pagination-btn:not(.prev):not(.next)');
    const prevPageBtn = document.querySelector('.pagination-btn.prev');
    const nextPageBtn = document.querySelector('.pagination-btn.next');
    
    if (paginationBtns.length) {
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all pagination buttons
                paginationBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get page number
                const pageNumber = this.textContent;
                console.log(`Loading page ${pageNumber}`);
                
                // Here you would load the products for the selected page
                loadPage(pageNumber);
                
                // Update prev/next button states
                updatePaginationControls();
            });
        });
        
        if (prevPageBtn && nextPageBtn) {
            prevPageBtn.addEventListener('click', function() {
                const currentPage = document.querySelector('.pagination-btn.active');
                const prevPage = currentPage.previousElementSibling;
                
                if (prevPage && !prevPage.classList.contains('prev')) {
                    prevPage.click();
                }
            });
            
            nextPageBtn.addEventListener('click', function() {
                const currentPage = document.querySelector('.pagination-btn.active');
                const nextPage = currentPage.nextElementSibling;
                
                if (nextPage && !nextPage.classList.contains('next') && !nextPage.classList.contains('pagination-ellipsis')) {
                    nextPage.click();
                }
            });
        }
    }
    
    // Product action buttons functionality
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            
            if (this.classList.contains('wishlist')) {
                console.log(`Added "${productTitle}" to wishlist`);
                // Show a small notification or change the icon
                this.innerHTML = '<i class="fas fa-heart"></i>';
            } else if (this.classList.contains('quickview')) {
                console.log(`Quick view for "${productTitle}"`);
                // Here you would show a modal with product details
            } else if (this.classList.contains('add-to-cart')) {
                console.log(`Added "${productTitle}" to cart`);
                // Show a small notification or animation
                showAddToCartNotification(productTitle);
            }
        });
    });
    
    // Helper Functions
    
    // Filter products based on selected filters
    function filterProducts() {
        // In a real implementation, this would filter the products based on selected criteria
        console.log('Filtering products based on selected filters');
        
        // Get selected categories
        const selectedCategories = Array.from(document.querySelectorAll('.filter-option input[name="category"]:checked'))
            .map(input => input.value);
        
        // Get selected rating
        const selectedRating = document.querySelector('.filter-option input[name="rating"]:checked')?.value;
        
        // Get selected brands
        const selectedBrands = Array.from(document.querySelectorAll('.filter-option input[name="brand"]:checked'))
            .map(input => input.value);
        
        // Get availability filter
        const inStockOnly = document.querySelector('.filter-option input[value="in-stock"]')?.checked;
        
        console.log('Selected filters:', {
            categories: selectedCategories,
            rating: selectedRating,
            brands: selectedBrands,
            inStockOnly: inStockOnly
        });
        
        // Here you would apply these filters to the product list
        // For now, we'll just simulate a loading state
        
        const productGrid = document.querySelector('.product-grid');
        if (productGrid) {
            productGrid.style.opacity = '0.6';
            
            setTimeout(() => {
                productGrid.style.opacity = '1';
                
                // Update product count
                document.querySelector('.product-count p').innerHTML = 
                    `Showing <span>1-${productGrid.children.length}</span> of <span>${productGrid.children.length}</span> products`;
            }, 500);
        }
    }
    
    // Sort products based on selected option
    function sortProducts(sortValue) {
        // In a real implementation, this would sort the products based on the selected option
        const productGrid = document.querySelector('.product-grid');
        if (productGrid) {
            const products = Array.from(productGrid.children);
            
            // Apply different sorting logic based on the sort value
            switch(sortValue) {
                case 'price-low-high':
                    products.sort((a, b) => {
                        const priceA = parseFloat(a.querySelector('.current-price').textContent.replace('$', ''));
                        const priceB = parseFloat(b.querySelector('.current-price').textContent.replace('$', ''));
                        return priceA - priceB;
                    });
                    break;
                    
                case 'price-high-low':
                    products.sort((a, b) => {
                        const priceA = parseFloat(a.querySelector('.current-price').textContent.replace('$', ''));
                        const priceB = parseFloat(b.querySelector('.current-price').textContent.replace('$', ''));
                        return priceB - priceA;
                    });
                    break;
                    
                case 'rating':
                    products.sort((a, b) => {
                        const ratingA = a.querySelector('.rating-count').textContent.replace(/[()]/g, '');
                        const ratingB = b.querySelector('.rating-count').textContent.replace(/[()]/g, '');
                        return parseInt(ratingB) - parseInt(ratingA);
                    });
                    break;
                    
                // Add other sorting options as needed
            }
            
            // Apply the sorted order
            productGrid.innerHTML = '';
            products.forEach(product => {
                productGrid.appendChild(product);
            });
        }
    }
    
    // Load products for a specific page
    function loadPage(pageNumber) {
        // In a real implementation, this would load products for the specified page
        console.log(`Loading products for page ${pageNumber}`);
        
        // Simulate loading state
        const productGrid = document.querySelector('.product-grid');
        if (productGrid) {
            productGrid.style.opacity = '0.6';
            
            setTimeout(() => {
                productGrid.style.opacity = '1';
                
                // Scroll to top of products section
                document.querySelector('.products-section').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 500);
        }
    }
    
    // Update pagination controls based on current page
    function updatePaginationControls() {
        const currentPage = document.querySelector('.pagination-btn.active');
        const prevPageBtn = document.querySelector('.pagination-btn.prev');
        const nextPageBtn = document.querySelector('.pagination-btn.next');
        
        if (currentPage && prevPageBtn && nextPageBtn) {
            // Disable prev button if on first page
            if (currentPage.textContent === '1') {
                prevPageBtn.setAttribute('disabled', true);
            } else {
                prevPageBtn.removeAttribute('disabled');
            }
            
            // Disable next button if on last page
            const lastPage = Array.from(document.querySelectorAll('.pagination-btn:not(.prev):not(.next)'))
                .filter(btn => !btn.classList.contains('pagination-ellipsis'))
                .pop();
                
            if (currentPage.textContent === lastPage.textContent) {
                nextPageBtn.setAttribute('disabled', true);
            } else {
                nextPageBtn.removeAttribute('disabled');
            }
        }
    }
    
    // Show add to cart notification
    function showAddToCartNotification(productTitle) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>"${productTitle}" has been added to your cart</p>
            <button class="close-notification"><i class="fas fa-times"></i></button>
        `;
        
        // Add styles
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--primary-color)';
        notification.style.color = 'white';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        notification.style.display = 'flex';
        notification.style.alignItems = 'center';
        notification.style.gap = '10px';
        notification.style.zIndex = '1000';
        notification.style.maxWidth = '350px';
        notification.style.animation = 'slideIn 0.3s forwards';
        
        // Add animation keyframes
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Add close functionality
        const closeBtn = notification.querySelector('.close-notification');
        closeBtn.addEventListener('click', function() {
            notification.style.animation = 'slideOut 0.3s forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOut 0.3s forwards';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }
}); 