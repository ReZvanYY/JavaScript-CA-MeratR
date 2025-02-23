const filterOptionContainer = document.createElement("section");
filterOptionContainer.id = "filter-options";
document.body.insertBefore(
  filterOptionContainer,
  document.querySelector("main")
);

const jacketFilterContainer = document.createElement("div");
jacketFilterContainer.classList.add("jacket-filter-container");
document.body.appendChild(jacketFilterContainer);

const filterButton = document.createElement("button");
filterButton.classList.add("filter-button");
filterButton.textContent = "Filter Options";

const filterDropDownContainer = document.createElement("div");
filterDropDownContainer.classList.add("drop-down-filter");
filterDropDownContainer.style.display = "none";

const filterDropDownForm = document.createElement("form");

filterOptionContainer.appendChild(filterButton);
filterOptionContainer.appendChild(filterDropDownContainer);

filterButton.addEventListener("click", () => {
  filterDropDownContainer.style.display =
    filterDropDownContainer.style.display === "none" ? "block" : "none";
});

async function fetchData() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/rainy-days/");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    const colors = [...new Set(data.data.map((jacket) => jacket.baseColor))];
    const genders = [...new Set(data.data.map((jacket) => jacket.gender))];

    colors.forEach((color) => {
      const colorCheckBoxOptions = document.createElement("input");
      colorCheckBoxOptions.type = "checkbox";
      colorCheckBoxOptions.classList.add("color-options");
      colorCheckBoxOptions.name = "color";
      colorCheckBoxOptions.value = color;
      const colorLabel = document.createElement("label");
      colorLabel.textContent = color;
      colorLabel.htmlFor = color;
      filterDropDownForm.appendChild(colorCheckBoxOptions);
      filterDropDownForm.appendChild(colorLabel);
    });
    genders.forEach((gender) => {
      const genderCheckBoxOptions = document.createElement("input");
      genderCheckBoxOptions.type = "checkbox";
      genderCheckBoxOptions.classList.add("gender-options");
      genderCheckBoxOptions.name = "gender";
      genderCheckBoxOptions.value = gender;
      const genderLabel = document.createElement("label");
      genderLabel.textContent = gender;
      genderLabel.htmlFor = gender;
      filterDropDownForm.appendChild(genderCheckBoxOptions);
      filterDropDownForm.appendChild(genderLabel);
    });
    filterDropDownContainer.appendChild(filterDropDownForm);

    filterDropDownForm.addEventListener("change", (filterEvent) => {
      if (filterEvent.target.type === "checkbox") {
        const previewData = document.getElementById("previewData");
        previewData.innerHTML = "";

        const checkedColors = Array.from(
          filterDropDownForm.querySelectorAll("input[name='color']:checked")
        ).map((color) => color.value);
        const checkedGender = Array.from(
          filterDropDownForm.querySelectorAll("input[name='gender']:checked")
        ).map((gender) => gender.value);

        data.data.forEach((jacket) => {
          if (
            (checkedColors.length === 0 ||
              checkedColors.includes(jacket.baseColor)) &&
            (checkedGender.length === 0 ||
              checkedGender.includes(jacket.gender))
          ) {
            const jacketLink = document.createElement("a");
            jacketLink.href = `HTML/product.html?jacketId=${jacket.id}`;

            const jacketContainer = document.createElement("article");

            const jacketTitle = jacket.title;
            const jacketTitleElement = document.createElement("h2");
            jacketTitleElement.textContent = jacketTitle;
            jacketContainer.appendChild(jacketTitleElement);

            const jacketImg = jacket.image.url;
            const jacketImgElement = document.createElement("img");
            jacketImgElement.classList.add("product-img");
            jacketImgElement.src = jacketImg;
            jacketImgElement.alt = jacket.image.alt;
            jacketContainer.appendChild(jacketImgElement);

            const jacketDescription = jacket.description;
            const jacketDescriptionElement = document.createElement("p");
            jacketDescriptionElement.classList.add("jacket-description");
            jacketDescriptionElement.textContent = jacketDescription;
            jacketContainer.appendChild(jacketDescriptionElement);

            const jacketPrice = jacket.price;
            const jacketOnSale = jacket.onSale;
            const jacketNewPrice = jacket.discountedPrice;
            const jacketPriceElement = document.createElement("p");
            jacketPriceElement.classList.add("price-box");
            jacketPriceElement.textContent = jacketPrice;
            jacketContainer.appendChild(jacketPriceElement);

            if (jacketOnSale === true) {
              jacketPriceElement.style.textDecoration = "line-through";
              const jacketDiscountPriceElement = document.createElement("p");
              jacketDiscountPriceElement.classList.add("discounted-price-box");
              jacketDiscountPriceElement.textContent = `${jacketNewPrice}`;
              jacketContainer.appendChild(jacketDiscountPriceElement);
            }
            jacketLink.appendChild(jacketContainer);
            previewData.appendChild(jacketLink);
          }
        });
      }
    });

    const previewData = document.getElementById("previewData");
    data.data.forEach((jacket) => {
      const jacketLink = document.createElement("a");
      jacketLink.href = `HTML/product.html?jacketId=${jacket.id}`;

      const jacketContainer = document.createElement("article");

      const jacketTitle = jacket.title;
      const jacketTitleElement = document.createElement("h2");
      jacketTitleElement.textContent = jacketTitle;
      jacketContainer.appendChild(jacketTitleElement);

      const jacketImg = jacket.image.url;
      const jacketImgElement = document.createElement("img");
      jacketImgElement.classList.add("product-img");
      jacketImgElement.src = jacketImg;
      jacketImgElement.alt = jacket.image.alt;
      jacketContainer.appendChild(jacketImgElement);

      const jacketDescription = jacket.description;
      const jacketDescriptionElement = document.createElement("p");
      jacketDescriptionElement.classList.add("jacket-description");
      jacketDescriptionElement.textContent = jacketDescription;
      jacketContainer.appendChild(jacketDescriptionElement);

      const jacketPrice = jacket.price;
      const jacketOnSale = jacket.onSale;
      const jacketNewPrice = jacket.discountedPrice;
      const jacketPriceElement = document.createElement("p");
      jacketPriceElement.classList.add("price-box");
      jacketPriceElement.textContent = jacketPrice;
      jacketContainer.appendChild(jacketPriceElement);

      if (jacketOnSale === true) {
        jacketPriceElement.style.textDecoration = "line-through";
        const jacketDiscountPriceElement = document.createElement("p");
        jacketDiscountPriceElement.classList.add("discounted-price-box");
        jacketDiscountPriceElement.textContent = `${jacketNewPrice}`;
        jacketContainer.appendChild(jacketDiscountPriceElement);
      }
      jacketLink.appendChild(jacketContainer);
      previewData.appendChild(jacketLink);
    });
  } catch (error) {
    console.error(error);
  }
}
fetchData();

document.title = "Rainy Days";
