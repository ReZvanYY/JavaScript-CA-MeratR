const urlParams = new URLSearchParams(window.location.search);
const jacketId = urlParams.get("jacketId");

fetch(`https://v2.api.noroff.dev/rainy-days/`)
  .then((response) => response.json())
  .then((data) => {
    if (data && data.data) {
      const jacket = data.data.find(
        (jacket) => jacket.id.toString() === jacketId
      );
      console.log(data);

      if (jacket) {
        const jacketContainer = document.getElementById("jacket-container");
        jacketContainer.innerHTML = "";

        const jacketTitle = document.createElement("h1");
        jacketTitle.classList.add("jacket-title");
        jacketTitle.textContent = jacket.title;
        jacketContainer.appendChild(jacketTitle);

        const jacketImage = document.createElement("img");
        jacketImage.classList.add("jacket-img");
        jacketImage.src = jacket.image.url;
        jacketImage.alt = jacket.image.alt;
        jacketContainer.appendChild(jacketImage);

        const jacketDescriptionElement = document.createElement("section");
        jacketDescriptionElement.classList.add("jacket-description");
        const jacketDescription = document.createElement("p");
        jacketDescription.textContent = jacket.description;
        jacketDescriptionElement.appendChild(jacketDescription);

        const purchaseItemButton = document.createElement("button");
        purchaseItemButton.classList.add("purchase-item-button");
        purchaseItemButton.textContent = "Buy now";
        purchaseItemButton.disabled = true;

        const sizeSelector = document.createElement("select");
        sizeSelector.classList.add("size-selector");
        sizeSelector.required = true;

        purchaseItemButton.addEventListener("click", () => {
          const priceShown = jacketOnSale
            ? jacket.discountedPrice
            : jacket.price;
          addToCart(
            jacket.title,
            priceShown,
            sizeSelector.value,
            jacket.image.url
          );
        });

        const defaultOption = document.createElement("option");
        defaultOption.classList.add("option-value");
        defaultOption.value = "";
        defaultOption.textContent = "Choose a size";
        defaultOption.classList.add("default-option");
        sizeSelector.appendChild(defaultOption);

        jacket.sizes.forEach((size) => {
          const sizeOption = document.createElement("option");
          sizeOption.classList.add("option-value");
          sizeOption.value = size;
          sizeOption.textContent = size;
          sizeSelector.appendChild(sizeOption);
        });
        sizeSelector.addEventListener("change", () => {
          if (sizeSelector.value) {
            purchaseItemButton.disabled = false;
          } else {
            purchaseItemButton.disabled = true;
          }
        });
        jacketDescriptionElement.appendChild(sizeSelector);
        jacketDescriptionElement.appendChild(purchaseItemButton);

        const jacketOnSale = jacket.onSale;
        const jacketNewPrice = jacket.discountedPrice;
        const jacketOriginalPrice = jacket.price;
        const jacketPriceElement = document.createElement("p");
        jacketPriceElement.classList.add("jacket-price");
        jacketPriceElement.textContent = jacketOriginalPrice;
        jacketDescriptionElement.appendChild(jacketPriceElement);

        if (jacketOnSale === true) {
          jacketPriceElement.style.textDecoration = "line-through";
          const jacketNewPriceElement = document.createElement("p");
          jacketNewPriceElement.classList.add("jacket-new-price");
          jacketNewPriceElement.textContent = jacketNewPrice;
          jacketDescriptionElement.appendChild(jacketNewPriceElement);
        }

        jacketContainer.appendChild(jacketDescriptionElement);
      }
      if (window.location.pathname.includes("product")) {
        document.title = jacket.title;
      }
    }
  });
