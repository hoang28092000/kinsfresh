fetch("../data/policy.json")
  .then((response) => response.json())
  .then((policys) => {
    // Trang chi tiết policy
    if (window.location.pathname.endsWith("/details/detail-policy.html")) {
      const urlParams = new URLSearchParams(window.location.search);
      const policyId = urlParams.get("id");

      if (!policyId) {
        document.body.innerHTML = "<p>ID hướng dẫn không hợp lệ.</p>";
        return;
      }

      const policy = policys.find((item) => item.id === policyId);

      if (policy) {
        document.querySelector(".policy-title").textContent = policy.title;
        document.querySelector(".policy-image").src = policy.image;
        document.querySelector(".policy-desc").innerHTML =
          policy.desc.replace(/\n/g, "<br>");
      } else {
        document.body.innerHTML = "<p>tin tức không tồn tại.</p>";
      }
    }
  })
  .catch((error) => console.error("Lỗi khi tải dữ liệu:", error));
