function createProductFilter(products, filters) {
  const productContainer = document.createElement("div");
  document.body.appendChild(productContainer);
  productContainer.innerHTML = "";

  // Create filter menu
  const filterMenu = document.createElement("div");
  filterMenu.className = "filter-menu";
  productContainer.appendChild(filterMenu);

  // Create filter items
  filters.forEach((filter) => {
    const filterItem = document.createElement("div");
    filterItem.className = "filter-item";
    filterMenu.appendChild(filterItem);

    const filterTitle = document.createElement("div");
    filterTitle.className = "filter-title";
    filterTitle.textContent = "Filter by " + filter.title;
    filterItem.appendChild(filterTitle);

    const filterValues = document.createElement("div");
    filterValues.className = "filter-values";
    filterItem.appendChild(filterValues);

    if (filter.type === "buttons") {
      // Add caret button to filter title
      const caretButton = document.createElement("button");
      caretButton.className = "caret-button";
      filterTitle.appendChild(caretButton);

      // Create button filters
      const processedValues = new Set(); // Track processed values
      products.forEach((product) => {
        const value = product[filter.attribute];
        if (filter.values.includes(value) && !processedValues.has(value)) {
          processedValues.add(value); // Add value to processed set
          const filterButton = document.createElement("button");
          filterButton.className = "button";
          filterButton.textContent = value;
          filterButton.addEventListener("click", () => {
            // Filter products by button value
            const filteredProducts = products.filter(
              (product) => product[filter.attribute] === value
            );
            renderProducts(filteredProducts);
          });
          filterValues.appendChild(filterButton);
        }
      });

      // Style filter values as a dropdown menu
      filterValues.className = "filter-values-dropdown";
      filterValues.style.display = "none";

      // Show/hide dropdown menu when caret button is clicked
      caretButton.addEventListener("click", () => {
        filterValues.style.display =
          filterValues.style.display === "none" ? "block" : "none";
      });

      // Add caret icon to caret button
      const caretIcon = document.createElement("span");
      caretIcon.className = "caret-icon";
      caretButton.appendChild(caretIcon);

      
    } else if (filter.type === "slider") {
      // Create slider filter
      const filterSliderContainer = document.createElement("div");
      filterSliderContainer.className = "slider-container";

      // Min value to the left of slider
      const filterMinValue = document.createElement("span");
      filterMinValue.className = "slider-min-value";
      filterMinValue.textContent = `${filter.min} `;
      filterSliderContainer.appendChild(filterMinValue);

      const filterSlider = document.createElement("input");
      filterSlider.type = "range";
      filterSlider.min = filter.min;
      filterSlider.max = filter.max;
      filterSlider.value = filter.value;
      filterSlider.addEventListener("input", () => {
        // Filter products by slider value
        const filteredProducts = products.filter((product) => {
          if (filter.direction === "less-than") {
            return product[filter.attribute] < filterSlider.value;
          } else if (filter.direction === "greater-than") {
            return product[filter.attribute] > filterSlider.value;
          }
        });
        renderProducts(filteredProducts);
        filterCurrentValue.textContent = `Showing ${filter.attribute}s: ${
          filter.direction === "less-than"
            ? "<"
            : filter.direction === "greater-than"
            ? ">"
            : ""
        } ${filterSlider.value}`; // Update current value display with direction
      });
      filterSliderContainer.appendChild(filterSlider);

      // Max value to the right of slider
      const filterMaxValue = document.createElement("span");
      filterMaxValue.className = "slider-max-value";
      filterMaxValue.textContent = `${filter.max} `;
      filterSliderContainer.appendChild(filterMaxValue);

      const filterCurrentValue = document.createElement("span");
      filterCurrentValue.className = "slider-current-value";

      filterCurrentValue.textContent = ` Showing ${filter.attribute}s ${
        filter.direction === "less-than"
          ? "<"
          : filter.direction === "greater-than"
          ? ">"
          : ""
      } ${filter.value} `;
      filterSliderContainer.appendChild(filterCurrentValue);

      filterValues.appendChild(filterSliderContainer);
    }
  });

  // Create product grid
  const productGrid = document.createElement("div");
  productGrid.className = "product-grid";
  productContainer.appendChild(productGrid);

  // Function to render filtered products to the DOM
  function renderProducts(filteredProducts) {
    productGrid.innerHTML = "";
    filteredProducts.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.className = "product-item";
      productItem.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        `;
      productGrid.appendChild(productItem);
    });
  }
  renderProducts(products);
}
