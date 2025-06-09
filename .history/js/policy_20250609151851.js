fetch("../data/policy.json")
  .then((response) => response.json())
  .then((po) => {
    // Trang danh sách hướng dẫn
    const newsList = document.querySelector(".list-news_main");
    if (newsList) {
      newsList.innerHTML = "";
      newss.forEach((news) => {
        const card = document.createElement("a");
        card.href = `../details/detail-news.html?id=${news.id}`;
        card.className = "news-card";
        card.innerHTML = `
          <div class="news-image-container">
            <img src="${news.image}" alt="${news.title}" class="news-image">
          </div>
          <div class="news-info">
            <h3 class="news-name">${news.title}</h3>
            <p class="news-desc">${news.desc}</p>
          </div>
        `;
        newsList.appendChild(card);
    
      });
    }

    // Trang chi tiết hướng dẫn
    if (window.location.pathname.endsWith("/details/detail-news.html")) {
      const urlParams = new URLSearchParams(window.location.search);
      const newsId = urlParams.get("id");

      if (!newsId) {
        document.body.innerHTML = "<p>ID hướng dẫn không hợp lệ.</p>";
        return;
      }

      const news = newss.find((item) => item.id === newsId);

      if (news) {
        document.querySelector(".news-title").textContent = news.title;
        document.querySelector(".news-image").src = news.image;
        document.querySelector(".news-desc").innerHTML =
          news.desc.replace(/\n/g, "<br>");
      } else {
        document.body.innerHTML = "<p>tin tức không tồn tại.</p>";
      }
    }
  })
  .catch((error) => console.error("Lỗi khi tải dữ liệu:", error));
