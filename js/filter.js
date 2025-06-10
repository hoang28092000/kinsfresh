document.getElementById("btn-search").addEventListener("click", function () {
  searchItems();
});

document
  .querySelector(".search-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchItems();
    }
  });

function searchItems() {
  const keyword = document.querySelector(".search-input").value.toLowerCase();
  const resultsContainer = document.getElementById("search-results");

  fetch("../data/products.json")
    .then((response) => response.json())
    .then((products) => {
      resultsContainer.innerHTML = ""; // Xóa kết quả cũ

      const filteredItems = products.filter(
        (item) =>
          (item.name && item.name.toLowerCase().includes(keyword)) ||
          (item.desc && item.desc.toLowerCase().includes(keyword))
      );

      if (filteredItems.length > 0) {
        filteredItems.forEach((item) => {
          const resultItem = document.createElement("a");
          resultItem.className = "product-card";
          resultItem.href = `../details/detail-products.html?id=${item.id}`;
          resultItem.innerHTML = `
          <div class="product-image-container">
            <img src="${item.image}" alt="${item.name}" class="product-image">
            <img src="${item.imageHover}" alt="${
            item.name
          }" class="product-image_hover">
          </div>
          <div class="product-info">
            <h3 class="product-name">${item.name}</h3>
            <p class="product-price">${item.price.toLocaleString(
              "vi-VN"
            )} VND</p>
          </div>
        `;
          resultsContainer.appendChild(resultItem);
          document.querySelector(".right-content").style.display = "none";
        });
      } else {
        resultsContainer.innerHTML = `<div id="error-search">
                                        <div class="content">
                                            <h3>Không tìm thấy kết quả</h3>
                                        </div>
                                    </div>`;
                                    setTimeout(() => {
          resultsContainer.innerHTML = "";
        }, 2000);
      }
    })
    .catch((error) => console.error("Lỗi khi tải dữ liệu:", error));
}
