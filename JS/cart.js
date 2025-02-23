const shoppingCartArea = document.getElementById("ShowItemsInCart");

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const counterElement = document.createElement("p");
const totalSumElement = document.createElement("p");

counterElement.textContent = "Items in your cart: 0";
totalSumElement.textContent = "Total: $0.00";

function saveCartToStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function updateShoppingCart() {
  if (!shoppingCartArea) return;

  if (cartItems.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Your cart is empty - start shopping!";
    shoppingCartArea.appendChild(emptyMessage);
    shoppingCartArea.appendChild(counterElement);
    shoppingCartArea.appendChild(totalSumElement);
  } else {
    shoppingCartArea.innerHTML = "";

    cartItems.forEach((item, index) => {
      const cartItemElements = document.createElement("section");
      cartItemElements.innerHTML = `   
    <img src="${item.image}" alt="${item.name}">
    <p class="item-name">${item.name}</p>
    <p class="item-size">Size: ${item.size}</p>
    <p class="item-price">Price: ${item.price}</p>
    <p class="item-quantity">Quantity: ${item.quantity}</p>
    <button class="remove-from-cart" data-index="${index}">Remove</button>
    <button class="decrease-quantity" data-index="${index}">-</button>
    <button class="increase-quantity" data-index="${index}">+</button>
    `;
      shoppingCartArea.appendChild(cartItemElements);
    });

    const itemCount = cartItems.length;
    const totalSum = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    counterElement.textContent = `Items in the cart: ${itemCount}`;
    totalSumElement.textContent = `Total: $${totalSum.toFixed(2)}`;
    const goSpendMoneyButton = document.getElementById("ShowItemsInCart");
    goSpendMoneyButton.innerHTML +=
      '<button class="confirm-payment">Confirm Payment</button>';
  }
}

if (shoppingCartArea) {
  shoppingCartArea.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-from-cart")) {
      const index = parseInt(event.target.dataset.index);
      removeFromCart(index);
    } else if (event.target.classList.contains("decrease-quantity")) {
      const index = parseInt(event.target.dataset.index);
      decreaseQuantity(index);
    } else if (event.target.classList.contains("increase-quantity")) {
      const index = parseInt(event.target.dataset.index);
      increaseQuantity(index);
    }
  });
}

function addToCart(itemName, itemPrice, itemSize, itemsImg) {
  if (!itemName || !itemPrice || !itemSize || !itemsImg) {
    console.log("Invalid");
    return;
  }
  const existingItem = cartItems.find(
    (item) => item.name === itemName && item.size === itemSize
  );
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({
      name: itemName,
      price: itemPrice,
      size: itemSize,
      quantity: 1,
      image: itemsImg,
    });
  }
  saveCartToStorage();
  updateShoppingCart();
}

function decreaseQuantity(index) {
  if (index < 0 || index >= cartItems.length) {
    console.error("Index error - invalid");
    return;
  }
  const itemDecrease = cartItems[index];
  if (itemDecrease.quantity > 1) {
    itemDecrease.quantity--;
  } else {
    removeFromCart(index);
  }
  saveCartToStorage();
  updateShoppingCart();
}
function increaseQuantity(index) {
  if (index < 0 || index >= cartItems.length) {
    console.error("Index error - invalid");
    return;
  }
  const itemIncrease = cartItems[index];
  itemIncrease.quantity++;
  saveCartToStorage();
  updateShoppingCart();
}

function removeFromCart(index) {
  if (index < 0 || index >= cartItems.length) {
    console.error("Invalid index");
    return;
  }
  cartItems.splice(index, 1);
  saveCartToStorage();
  updateShoppingCart();
}
document.querySelectorAll(".buy_now").forEach((button) => {
  button.addEventListener("click", () => {
    const parent = button.parentNode.parentNode;
    const itemName = parent.querySelector(".item_name").textContent;
    const itemPrice = parseFloat(
      parent.querySelector(".item_price").textContent.split(": ")[1]
    );
    addToCart(itemName, itemPrice);
  });
});

if (shoppingCartArea) {
  updateShoppingCart();
}

const paymentPage = document.querySelector(".confirm-payment");
paymentPage.addEventListener("click", () => {
  window.location.href = "../HTML/payment.html";
});

document.title = "Rainy Days: Cart";
