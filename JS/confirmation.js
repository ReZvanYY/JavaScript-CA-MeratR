const confirmationMessage = document.getElementById("orderConfirmationMessage");

const orderData = JSON.parse(localStorage.getItem("orderData"));
if (!orderData) {
  console.error("orderData not found in local storage");
}
console.log(orderData);

confirmationMessage.innerHTML = `
    <section aria-labelledby="confirmation-details">
            <h1 id="confirmation-details">Order Details</h1>
          <section>
          <p class="thank-you-text">Thank you for your order, <strong>${orderData.name}!</strong></p>
          <p> We've received your order!</p>
          <p> We will send an e-mail to <strong>${orderData.email}</strong> once your order has been
            shipped.</p>
            <section class="payment-info">
                    <p id="payment-summary"></p>
                    <p id="confirmation-message"></p>
                    <p id="confirm-name"></p>
                    <p id="confirm-email"></p>
                    <p id="confirm-address"></p>
                    <p id="confirm-city"></p>
                    <p id="confirm-state"></p>
                    <p id="confirm-zip"></p>
                    <p id="confirm-card-number"></p>
                    <p id="confirm-expiration-date"></p>
                    <p id="confirm-cvv"></p>
            </section>
            <section class="order-summary">
            <h2 class="order-summary-title"></h2>
            <ul id="jacketsOrdered"></ul>
            </section>
            
            </section>
        </section>
`;

document.getElementById("confirm-name").textContent = `Name: ${orderData.name}`;
document.getElementById(
  "confirm-email"
).textContent = `Email: ${orderData.email}`;
document.getElementById(
  "confirm-address"
).textContent = `Address: ${orderData.address}`;
document.getElementById("confirm-city").textContent = `City: ${orderData.city}`;
document.getElementById(
  "confirm-state"
).textContent = `State: ${orderData.state}`;
document.getElementById(
  "confirm-zip"
).textContent = `Zip Code: ${orderData.zip}`;
document.getElementById(
  "confirm-card-number"
).textContent = `Card Number: **** **** **** ${orderData["card-number"].slice(
  -4
)}`;

const jacketOrdered = document.getElementById("jacketsOrdered");
const jackets = JSON.parse(localStorage.getItem("cartItems"));
if (jackets) {
  const jacketsHtml = jackets
    .map((jacket, index) => {
      return `
        <li class="ordered-list-container">
        <img src="${jacket.image}" alt="${
        jacket.name
      }" class="ordered-jacket-img">
        <p class="ordered-jacket-name">${index + 1}: ${jacket.name}</p>
        <p class="ordered-jacket-quantity">Quantity:${jacket.quantity}</p>
        <p class="ordered-jacket-price">$${jacket.price}</p>
        <p class="ordered-jacket-total-price">Total amount: $${
          jacket.quantity * jacket.price
        }</p>
        </li>
        `;
    })
    .join("");
  jacketOrdered.innerHTML = jacketsHtml;
} else {
  console.log("no jackets found.");
}

const returnHomeButton = document.createElement("button");
returnHomeButton.textContent = "Continue Shopping!";
returnHomeButton.classList.add("homing-button");
jacketOrdered.appendChild(returnHomeButton);

returnHomeButton.addEventListener("click", () => {
  localStorage.removeItem("cartItems");
  window.location.href = "../index.html";
});
