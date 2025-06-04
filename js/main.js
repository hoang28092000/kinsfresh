function loadPartial(id, filePath) {
  const target = document.getElementById(id);
  if (!target) return Promise.resolve();

  return fetch(filePath)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load ${filePath}`);
      return res.text();
    })
    .then((data) => {
      target.innerHTML = data;
    })
    .catch((err) => {
      console.error(err);
      target.innerHTML = `<div style="color:red;">Lỗi tải ${filePath}</div>`;
    });
}

// Gọi khi trang load
window.addEventListener("DOMContentLoaded", () => {
  loadPartial("header", "../partials/header.html");
  loadPartial("footer", "../partials/footer.html");
});

// menu
window.addEventListener("DOMContentLoaded", () => {
  loadPartial("header", "../partials/header.html").then(() => {
    // Gắn sự kiện menu sau khi header đã load xong
    const menuBar = document.querySelector("#menu-bar");
    const menu = document.querySelector(".navbar");

    if (menuBar && menu) {
      menuBar.addEventListener("click", () => {
        menu.classList.toggle("show");
      });
    }
    // Đóng menu khi click ra ngoài
    document.addEventListener("click", (event) => {
      if (!menuBar.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.remove("show");
      }
    });
  });

  loadPartial("footer", "../partials/footer.html");
});

// slider


