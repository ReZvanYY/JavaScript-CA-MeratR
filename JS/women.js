async function fetchWomenJacketData() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/rainy-days/");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    const displayWomenJackets = document.getElementById("womenTab");
    displayWomenJackets.innerHTML = "";

    data.data.forEach((jacket) => {
      const femaleJacket = jacket.gender;
      if (femaleJacket === "Female") {
        const jacketLink = document.createElement("a");
        jacketLink.href = `../HTML/product.html?jacketId=${jacket.id}`;

        const womenJacketContainer = document.createElement("section");
        womenJacketContainer.classList.add("women-jacket-container");
        displayWomenJackets.appendChild(womenJacketContainer);

        const jacketName = jacket.title;
        const jacketNameElement = document.createElement("h2");
        jacketNameElement.textContent = jacketName;
        womenJacketContainer.appendChild(jacketNameElement);

        const jacketImage = jacket.image.url;
        const jacketImageAlt = jacket.image.alt;
        const jacketImageElement = document.createElement("img");
        jacketImageElement.classList.add("jacket-image");
        jacketImageElement.src = jacketImage;
        jacketImageElement.alt = jacketImageAlt;
        womenJacketContainer.appendChild(jacketImageElement);

        const jacketDescription = jacket.description;
        const jacketDescriptionElement = document.createElement("p");
        jacketDescriptionElement.textContent = jacketDescription;
        jacketDescriptionElement.classList.add("jacket-description");
        womenJacketContainer.appendChild(jacketDescriptionElement);

        const jacketPrice = jacket.price;
        const jacketOnSale = jacket.onSale;
        const jacketDiscountPrice = jacket.discountedPrice;
        const jacketPriceElement = document.createElement("p");
        jacketPriceElement.classList.add("price-box");
        jacketPriceElement.textContent = jacketPrice;
        womenJacketContainer.appendChild(jacketPriceElement);

        if (jacket.onSale === true) {
          jacketPriceElement.style.textDecoration = "line-through";
          const jacketDiscountPriceElement = document.createElement("p");
          jacketDiscountPriceElement.classList.add("discounted-price-box");
          jacketDiscountPriceElement.textContent = `${jacketDiscountPrice}`;
          womenJacketContainer.appendChild(jacketDiscountPriceElement);
        }
        jacketLink.appendChild(womenJacketContainer);
        displayWomenJackets.appendChild(jacketLink);
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
fetchWomenJacketData();
document.title = "Rainy Days: Women";
