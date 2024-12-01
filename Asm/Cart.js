const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const selectAllCheckbox = document.getElementById("select-all");
const checkoutBtn = document.getElementById("checkout-btn");

// Function to render the cart
function renderCart() {
  cartContainer.innerHTML = "";
  let totalPrice = 0;
  let allSelected = true;

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<tr><td colspan='7'>Your cart is empty!</td></tr>";
    totalPriceElement.textContent = "0 VND";
    checkoutBtn.disabled = true;
    return;
  }

  cartItems.forEach((item, index) => {
    const quantity = item.quantity || 1;  // Ensure quantity has a value
    const price = parseInt(item.price.replace(/[^0-9]/g, ""));
    const isSelected = item.isSelected || false;

    if (isSelected) {
      totalPrice += price * quantity;
    } else {
      allSelected = false;
    }

    const row = `
      <tr>
        <td><input type="checkbox" data-index="${index}" class="item-checkbox" ${isSelected ? "checked" : ""}></td>
        <td>${item.name}</td>
        <td><img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;"></td> <!-- Image column -->
        <td>${price.toLocaleString()} VND</td>
        <td>
          <button class="decrease-btn" data-index="${index}" ${!isSelected ? "disabled" : ""}>-</button>
          <span class="quantity">${quantity}</span>
          <button class="increase-btn" data-index="${index}" ${!isSelected ? "disabled" : ""}>+</button>
        </td>
        <td>${(price * quantity).toLocaleString()} VND</td>
        <td><button class="remove-btn" data-index="${index}">Remove</button></td>
      </tr>
    `;
    cartContainer.innerHTML += row;
  });

  totalPriceElement.textContent = `${totalPrice.toLocaleString()} VND`;
  selectAllCheckbox.checked = allSelected;
  checkoutBtn.disabled = totalPrice === 0;
}

// Function to select all items
function selectAllItems() {
  const isChecked = selectAllCheckbox.checked;
  cartItems.forEach((item) => (item.isSelected = isChecked));
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
}

// Event handling for checkboxes, increase/decrease, and remove buttons
cartContainer.addEventListener("click", (e) => {
  const index = parseInt(e.target.getAttribute("data-index"));

  if (e.target.classList.contains("item-checkbox")) {
    cartItems[index].isSelected = e.target.checked;
  } else if (e.target.classList.contains("increase-btn")) {
    if (cartItems[index].quantity == null || cartItems[index].quantity === undefined) {
      cartItems[index].quantity = 1;
    }
    cartItems[index].quantity += 1;
  } else if (e.target.classList.contains("decrease-btn")) {
    if (cartItems[index].quantity == null || cartItems[index].quantity === undefined) {
      cartItems[index].quantity = 1;
    }
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity -= 1;
    }
  } else if (e.target.classList.contains("remove-btn")) {
    const confirmDelete = confirm("Are you sure you want to remove this product?");
    if (confirmDelete) {
      cartItems.splice(index, 1);
      alert("Product removed from cart.");
    }
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
});

// Event handling for checkout button
checkoutBtn.addEventListener("click", () => {
  // Filter selected items (isSelected = true)
  const selectedItems = cartItems.filter(item => item.isSelected === true);

  // Check if there are no selected items
  if (selectedItems.length === 0) {
    alert("You have not selected any items to buy.");
    return;
  }

  // Calculate the total price of the selected items
  const totalPrice = selectedItems.reduce((total, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, "")); // Remove non-numeric characters
    return total + (price * item.quantity);  // Sum the value of the selected items
  }, 0);

  // Confirm and place the order
  const confirmOrder = confirm(`Are you sure you want to buy this product?`);
  if (confirmOrder) {
    alert("Your order has been successfully placed!");

    // Update the cart: keep unselected items
    const unselectedItems = cartItems.filter(item => !item.isSelected); 
    cartItems.length = 0;  // Clear all items
    cartItems.push(...unselectedItems);  // Keep unselected items

    localStorage.setItem("cart", JSON.stringify(cartItems));  // Update cart
    renderCart();  // Update cart UI
  }
});

// Render the cart on page load
renderCart();
