document.getElementById("btn-search").addEventListener("click", function () {
  searchItems();
});

document.querySelector(".search-input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchItems();
  }
});

function searchItems() {
  const keyword = document.querySelector(".search-input").value.toLowerCase();
  const resultsContainer = document.getElementById("search-results");

  fetch("../data/products.json")
    .then(response => response.json())
    .then(products => {
      resultsContainer.innerHTML = ""; // Xóa kết quả cũ

      const filteredItems = products.filter(item =>
        item.title.toLowerCase().includes(keyword) ||
        item.desc.toLowerCase().includes(keyword)
      );

      if (filteredItems.length > 0) {
        filteredItems.forEach(item => {
          const resultItem = document.createElement("div");
          resultItem.className = "search-item";
          resultItem.innerHTML = `<a href="detail.html?id=${item.id}">${item.title}</a>`;
          resultsContainer.appendChild(resultItem);
        });
      } else {
        resultsContainer.innerHTML = "<p>Không tìm thấy kết quả.</p>";
      }
    })
    .catch(error => console.error("Lỗi khi tải dữ liệu:", error));
}