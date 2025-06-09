fetch("../data/policy.json")
  .then((response) => response.json())
  .then((policys) => {

    // Trang chi tiết hướng dẫn
    if (window.location.pathname.endsWith("/details/detail-news.html")) {
      const urlParams = new URLSearchParams(window.location.search);
      const newsId = urlParams.get("id");

      if (!newsId) {
        document.body.innerHTML = "<p>ID hướng dẫn không hợp lệ.</p>";
        return;
      }

      const news = policys.find((item) => item.id === newsId);

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
