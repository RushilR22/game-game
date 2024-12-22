document.addEventListener('DOMContentLoaded', () => {
    // Existing modal creation function remains the same
    function createModal(title, content) {
        const modalWrapper = document.createElement('div');
        modalWrapper.className = 'modal';
        modalWrapper.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${title}</h2>
                ${content}
            </div>
        `;

        document.body.appendChild(modalWrapper);
        modalWrapper.style.display = 'flex';

        // Close modal when clicking the 'x'
        const closeButton = modalWrapper.querySelector('.close-modal');
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modalWrapper);
        });

        // Close modal when clicking outside the content
        modalWrapper.addEventListener('click', (e) => {
            if (e.target === modalWrapper) {
                document.body.removeChild(modalWrapper);
            }
        });
    }

    // New function to manage orders
    function manageOrders() {
        // Get the orders container
        const ordersContainer = document.getElementById('ordersContainer');
        
        // Initialize orders array in local storage if not exists
        if (!localStorage.getItem('pizzaOrders')) {
            localStorage.setItem('pizzaOrders', JSON.stringify([]));
        }

        // Function to render orders
        function renderOrders() {
            const orders = JSON.parse(localStorage.getItem('pizzaOrders'));
            
            if (orders.length === 0) {
                ordersContainer.innerHTML = 'You haven\'t placed any orders yet. Start by ordering your favorite pizza!';
                return;
            }

            // Create order list
            const orderList = document.createElement('ul');
            orderList.className = 'orders-list';

            orders.forEach((order, index) => {
                const orderItem = document.createElement('li');
                orderItem.className = 'order-item';
                orderItem.innerHTML = `
                    <div class="order-details">
                        <h3>${order.pizzaName}</h3>
                        <p>Size: ${order.size}</p>
                        <p>Price: $${order.price.toFixed(2)}</p>
                        <button class="remove-order btn" data-index="${index}">Remove</button>
                    </div>
                `;
                orderList.appendChild(orderItem);
            });

            ordersContainer.innerHTML = '';
            ordersContainer.appendChild(orderList);

            // Add event listeners for remove buttons
            const removeButtons = document.querySelectorAll('.remove-order');
            removeButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const index = e.target.getAttribute('data-index');
                    const orders = JSON.parse(localStorage.getItem('pizzaOrders'));
                    orders.splice(index, 1);
                    localStorage.setItem('pizzaOrders', JSON.stringify(orders));
                    renderOrders();
                });
            });
        }

        // Add to order functionality for menu pages
        const addToOrderButtons = document.querySelectorAll('.add-to-order');
        addToOrderButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const pizzaCard = e.target.closest('.pizza-card');
                const pizzaName = pizzaCard.querySelector('h3, h4').textContent;
                const price = parseFloat(pizzaCard.querySelector('.price').textContent.replace('$', ''));

                // If on order page, use form details
                const pizzaOrderForm = document.getElementById('pizzaOrderForm');
                if (pizzaOrderForm) {
                    const pizzaType = document.getElementById('pizzaType').value;
                    const pizzaSize = document.querySelector('input[name="pizzaSize"]:checked').value;
                    const toppings = Array.from(document.querySelectorAll('input[name="toppings"]:checked'))
                        .map(t => t.value)
                        .join(', ');

                    const orderDetails = {
                        pizzaName: pizzaType,
                        size: pizzaSize,
                        toppings: toppings,
                        price: price
                    };

                    const orders = JSON.parse(localStorage.getItem('pizzaOrders'));
                    orders.push(orderDetails);
                    localStorage.setItem('pizzaOrders', JSON.stringify(orders));
                } else {
                    // For menu page
                    const orderDetails = {
                        pizzaName: pizzaName,
                        size: 'Medium', // Default size
                        price: price
                    };

                    const orders = JSON.parse(localStorage.getItem('pizzaOrders'));
                    orders.push(orderDetails);
                    localStorage.setItem('pizzaOrders', JSON.stringify(orders));
                }

                // Create confirmation modal
                const modalContent = `
                    <div class="order-added-confirmation">
                        <h3>Added to Orders</h3>
                        <p>${pizzaName} has been added to your orders.</p>
                    </div>
                `;
                createModal('Order Added', modalContent);

                // Render orders on My Orders page
                renderOrders();
            });
        });

        // Initial render of orders
        renderOrders();
    }

    // Call the order management function
    manageOrders();

    // Existing form submission code remains the same...
});