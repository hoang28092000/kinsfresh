fetch("../data/products.json")
  .then((response) => response.json())
  .then((products) => {
    const productList = document.querySelector(".product-wrapper");
    if (productList) {
      productList.innerHTML = "";
      products.forEach((product) => {
        const card = document.createElement("a");
        card.href = `../details/detail-products.html?id=${product.id}`;
        card.className = "product-card";
        card.innerHTML = `
          <div class="product-image-container">
            <img src="${product.image}" alt="${
          product.name
        }" class="product-image">
            <img src="${product.imageHover}" alt="${
          product.name
        }" class="product-image_hover">
          </div>
          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${product.price.toLocaleString(
              "vi-VN"
            )} VND</p>
          </div>
        `;
        productList.appendChild(card);
      });
    }

    // Trang chi tiết sản phẩm
    if (window.location.pathname.endsWith("/details/detail-products.html")) {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get("id");
      const product = products.find((item) => String(item.id) === productId);

      if (product) {
        // Ảnh chính
        const imgMain = document.querySelector(".img-main");
        if (imgMain) imgMain.src = product.image;

        // Ảnh hover (nếu có)
        const imgHover = document.querySelector(".img-hover");
        if (imgHover && product.imageHover) imgHover.src = product.imageHover;

        // Tên sản phẩm
        const nameEl = document.querySelector(".name-product");
        if (nameEl) nameEl.textContent = product.name;

        // Giá sản phẩm
        const priceEl = document.querySelector(".price-product");
        if (priceEl)
          priceEl.textContent = `${product.price.toLocaleString("vi-VN")} VND`;

        // Mô tả sản phẩm
        const descEl = document.querySelector(".desc-product");
        if (descEl) descEl.innerHTML = product.description;
      } else {
        document.body.innerHTML = "<p>Sản phẩm không tồn tại.</p>";
      }
    }
  })
  .catch((error) => console.error("Lỗi khi tải dữ liệu:", error));
