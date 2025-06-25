document.addEventListener('DOMContentLoaded', () => {

    const products = [
      { id: 1, name: "Product-1", price: 29.99 },
      { id: 2, name: "Product-2", price: 19.99 },
      { id: 3, name: "Product-3", price: 49.99 },
    ];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalDisplay = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-btn");

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `
        <div class="product">
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}" id="add-cart-btn">Add to Cart</button>
        </div>
        `;
        productList.appendChild(productDiv);
    });

    productList.addEventListener('click', (e) => {
        if(e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find(p => p.id === productId);
            addToCart(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        };
    });

    function addToCart(product) {
        cart.push(product);
    };

    function renderCart() {
        cartItems.innerText = "";

        let totalPrice = 0;

        if (cart.length > 0) {
            emptyCartMessage.classList.add("hidden");
            cartTotalDisplay.classList.remove("hidden");
            cart.forEach((item, index) => {
              totalPrice += item.price;
              const cartItem = document.createElement("div");
              cartItem.classList.add("cart-items");
              cartItem.innerHTML = `
                <div class="product">
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button style="background-color: red; color: white" class="remove-btn">Remove</button>
                </div>
                `;

              cartItems.appendChild(cartItem);
              totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;

              // Attach remove listeners after rendering
              const removeButtons = document.querySelectorAll(".remove-btn");
              removeButtons.forEach((button) => {
                button.addEventListener("click", (e) => {
                  const index = parseInt(button.getAttribute("data-index"));
                  cart.splice(index, 1); // remove from cart array
                  renderCart(); // re-render the updated cart
                  if(cart.length === 0) {
                    totalPriceDisplay.textContent = `$0.00`;
                  }
                });
              });
            });
        } else {
            emptyCartMessage.classList.remove("hidden");
        };
    };

    checkoutButton.addEventListener('click', () => {
        cartItems.textContent = "Your cart is empty";
        localStorage.removeItem("cart");
        alert("Checkout Successfully!");
        totalPriceDisplay.textContent = `$0.00`;
    });
    renderCart();
});