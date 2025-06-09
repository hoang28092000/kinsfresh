fetch("../data/detail-policy.json")
  .then(response => response.json())
  .then(policies => {
    // 🏷 Chọn chính sách cần hiển thị (ví dụ: "chinh-sach-bao-mat-thong-tin")
    const policyId = "chinh-sach-bao-mat-thong-tin"; // ID cố định

    const policy = policies.find(item => item.id === policyId);

    if (policy) {
      document.querySelector(".policy-title").textContent = policy.title;
      document.querySelector(".policy-desc").innerHTML = policy.desc.replace(/\n/g, "<br>");
    } else {
      document.body.innerHTML = "<p>Chính sách không tồn tại.</p>";
    }
  })
  .catch(error => console.error("LỖI FETCH:", error));