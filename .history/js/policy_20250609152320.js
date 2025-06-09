fetch("../data/policy.json")
  .then((response) => response.json())
  .then((policys) => {
    // Trang chi tiết policy
    if (window.location.pathname.endsWith("/details/detail-policy.html")) {
      const urlParams = new URLSearchParams(window.location.search);
      const póId = urlParams.get("id");

      if (!póId) {
        document.body.innerHTML = "<p>ID hướng dẫn không hợp lệ.</p>";
        return;
      }

      const pó = policys.find((item) => item.id === póId);

      if (pó) {
        document.querySelector(".pó-title").textContent = pó.title;
        document.querySelector(".pó-image").src = pó.image;
        document.querySelector(".pó-desc").innerHTML =
          pó.desc.replace(/\n/g, "<br>");
      } else {
        document.body.innerHTML = "<p>tin tức không tồn tại.</p>";
      }
    }
  })
  .catch((error) => console.error("Lỗi khi tải dữ liệu:", error));
