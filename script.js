document.addEventListener("DOMContentLoaded", function () {
  const productsContainer = document.getElementById("products");
  const sortBySelect = document.getElementById("sortBy");
  const filterBySelect = document.getElementById("filterBy");

  async function getProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function renderProducts(products) {
    productsContainer.innerHTML = "";
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
              <h2>${product.title}</h2>
              <p>Category: ${product.category}</p>
              <p>Price: $${product.price}</p>
              <img src="${product.image}" alt="${product.title}">
          `;
      productsContainer.appendChild(productDiv);
    });
  }

  async function init() {
    let products = await getProducts();
    renderProducts(products);

    sortBySelect.addEventListener("change", async function () {
      const sortOrder = sortBySelect.value;
      products = await getProducts();
      if (sortOrder === "asc") {
        products.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "desc") {
        products.sort((a, b) => b.price - a.price);
      }
      renderProducts(products);
    });

    filterBySelect.addEventListener("change", async function () {
      const category = filterBySelect.value;
      products = await getProducts();
      if (category !== "all") {
        products = products.filter((product) => product.category === category);
      }
      renderProducts(products);
    });
  }

  init();
});
