const urlParams = new URLSearchParams(window.location.search);
const policyId = urlParams.get("id");

if (!policyId) {
  document.body.innerHTML = "<p>ID chính sách không hợp lệ.</p>";
} else {
  fetch("../data/detail-policy.json")
    .then(response => response.json())
    .then(policies => {
      const policy = policies.find(item => item.id === policyId);
      if (policy) {
        document.querySelector(".policy-title").textContent = policy.title;
        document.querySelector(".policy-desc").innerHTML = policy.desc.replace(/\n/g, "<br>");
      } else {
        document.body.innerHTML = "<p>Chính sách không tồn tại.</p>";
      }
    })
    .catch(error => console.error("LỖI FETCH:", error));
}
