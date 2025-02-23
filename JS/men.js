async function fetchMenJacketData() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/rainy-days/");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    const displayMenJackets = document.getElementById("menTab");
    displayMenJackets.innerHTML = "";

    data.data.forEach((jacket) => {
      const maleJacket = jacket.gender;
      if (maleJacket === "Male") {
        const jacketLink = document.createElement("a");
        jacketLink.href = `../HTML/product.html?jacketId=${jacket.id}`;

        const MenJacketContainer = document.createElement("section");
        MenJacketContainer.classList.add("men-jacket-container");
        displayMenJackets.appendChild(MenJacketContainer);

        const jacketName = jacket.title;
        const jacketNameElement = document.createElement("h2");
        jacketNameElement.textContent = jacketName;
        MenJacketContainer.appendChild(jacketNameElement);

        const jacketImage = jacket.image.url;
        const jacketImageAlt = jacket.image.alt;
        const jacketImageElement = document.createElement("img");
        jacketImageElement.classList.add("jacket-image");
        jacketImageElement.src = jacketImage;
        jacketImageElement.alt = jacketImageAlt;
        MenJacketContainer.appendChild(jacketImageElement);

        const jacketDescription = jacket.description;
        const jacketDescriptionElement = document.createElement("p");
        jacketDescriptionElement.textContent = jacketDescription;
        jacketDescriptionElement.classList.add("jacket-description");
        MenJacketContainer.appendChild(jacketDescriptionElement);

        const jacketPrice = jacket.price;
        const jacketOnSale = jacket.onSale;
        const jacketDiscountPrice = jacket.discountedPrice;
        const jacketPriceElement = document.createElement("p");
        jacketPriceElement.classList.add("price-box");
        jacketPriceElement.textContent = jacketPrice;
        MenJacketContainer.appendChild(jacketPriceElement);

        if (jacket.onSale === true) {
          jacketPriceElement.style.textDecoration = "line-through";
          const jacketDiscountPriceElement = document.createElement("p");
          jacketDiscountPriceElement.classList.add("discounted-price-box");
          jacketDiscountPriceElement.textContent = `${jacketDiscountPrice}`;
          MenJacketContainer.appendChild(jacketDiscountPriceElement);
        }
        jacketLink.appendChild(MenJacketContainer);
        displayMenJackets.appendChild(jacketLink);
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
fetchMenJacketData();
document.title = "Rainy Days: Men";
