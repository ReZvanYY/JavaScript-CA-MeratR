const showForm = document.getElementById("checkoutArea");

showForm.innerHTML += `
<section aria-labelledby="billing-info">
        <h2 id="billing-info">Billing Information</h2>
        <form id="checkout-form">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>
          
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
          
          <label for="address">Address:</label>
          <input type="text" id="address" name="address" required>
          
          <label for="city">City:</label>
          <input type="text" id="city" name="city" required>
          
          <label for="state">State:</label>
          <input type="text" id="state" name="state" required>
         
          <label for="zip">Zip:</label>
          <input type="text" id="zip" name="zip" required>
          
          <label for="card-number">Card Number:</label>
          <input type="text" id="card-number" name="card-number" required>
          
          <label for="expiration-date">Expiration Date:</label>
          <input type="text" id="expiration-date" name="expiration-date" required>
          
          <label for="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv" required>

          <button type="submit">Place Order</button>
      </form>
      </section>
`;

const form = document.getElementById("checkout-form");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const orderData = {};

    for (const [key, value] of formData) {
      orderData[key] = value;
    }

    localStorage.setItem("orderData", JSON.stringify(orderData));
    console.log("Order data: ", orderData);

    window.location.href = "../HTML/confirmation.html";
  });
  document.title = "Rainy Days: payment";
}
