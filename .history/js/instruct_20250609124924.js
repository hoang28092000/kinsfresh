fetch("/data/instruct.json")
  .then((response) => response.json())
  .then((instructs) => {
    // Trang danh sách hướng dẫn
    const instructList = document.querySelector(".list-instruct");
    if (instructList) {
      instructList.innerHTML = "";
      instructs.forEach((instruct) => {
        const card = document.createElement("a");
        card.href = `../details/detail-instruct.html?id=${instruct.id}`;
        card.className = "instruct-card";
        card.innerHTML = `
          <div class="instruct-image-container">
            <img src="${instruct.image}" alt="${instruct.title}" class="instruct-image">
          </div>
          <div class="instruct-info">
            <h3 class="instruct-name">${instruct.title}</h3>
            <p class="instruct-desc">${instruct.desc}</p>
          </div>
        `;
        instructList.appendChild(card);
      });
    }

    // Trang chi tiết hướng dẫn
    if (window.location.pathname.endsWith("/details/detail-instruct.html")) {
      const urlParams = new URLSearchParams(window.location.search);
      const instructId = urlParams.get("id");

      if (!instructId) {
        document.body.innerHTML = "<p>ID hướng dẫn không hợp lệ.</p>";
        return;
      }

      const instruct = instructs.find((item) => item.id === instructId);

      if (instruct) {
        document.querySelector(".instruct-title").textContent = instruct.title;
        document.querySelector(".instruct-image").src = instruct.image;
        document.querySelector(".instruct-desc").innerHTML =
          instruct.desc.replace(/\n/g, "<br>");
      } else {
        document.body.innerHTML = "<p>Hướng dẫn không tồn tại.</p>";
      }
    }
  })
  .catch((error) => console.error("Lỗi khi tải dữ liệu:", error));
