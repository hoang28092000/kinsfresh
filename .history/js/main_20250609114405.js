// Sửa lại hàm loadPartial để trả về Promise<void> và đơn giản hóa logic
async function loadPartial(id, filePath) {
  const target = document.getElementById(id);
  if (!target) return;
  try {
    const res = await fetch(filePath);
    if (!res.ok) throw new Error(`Failed to load ${filePath}`);
    const data = await res.text();
    target.innerHTML = data;
  } catch (err) {
    console.error(err);
    target.innerHTML = `<div style="color:red;">Lỗi tải ${filePath}</div>`;
  }
}

// Hàm xác định đường dẫn partial phù hợp cho mọi trang
function getPartialPath(filename) {
  const path = window.location.pathname;
  if (path === "/" || path.endsWith("/index.html")) {
    return "partials/" + filename;
  }
  return "../partials/" + filename;
}

// Gọi khi trang load, chỉ cần 1 lần DOMContentLoaded
window.addEventListener("DOMContentLoaded", async () => {
  await loadPartial("header", getPartialPath("../partials/header.html"));
  await loadPartial("footer", getPartialPath("../partials/footer.html"));
  await loadPartial("contact-second", getPartialPath("../partials/gittcontact-second.html"));

  // Gắn sự kiện menu sau khi header đã load xong
  const menuBar = document.querySelector("#menu-bar");
  const menu = document.querySelector(".navbar");
  if (menuBar && menu) {
    menuBar.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
    // Đóng menu khi click ra ngoài
    document.addEventListener("click", (event) => {
      if (!menuBar.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.remove("show");
      }
    });
  }

  // nav-dropDown
  const dropNavbar = document.querySelector(".nav_category-list");
  const btnDrop = document.querySelector("#drop-nav");
  if (dropNavbar && btnDrop) {
    btnDrop.addEventListener("click", (e) => {
      if (window.innerWidth < 992) {
        e.preventDefault();
        dropNavbar.classList.toggle("open");
        btnDrop.classList.toggle("rotate");
      }
    });
  }
});

// slide-main
const listImage = document.querySelector(".main .banner-main .slider .list-img");
const imgsMain = document.querySelectorAll(".main .banner-main .slider img");
const prevBanner = document.querySelector(".banner-main .prev");
const nextBanner = document.querySelector(".banner-main .next");

if (listImage && imgsMain.length && prevBanner && nextBanner) {
  const imgMainLength = imgsMain.length;
  let index = 0;
  const bannerSlideMain = () => {
    let widthSliderMain = imgsMain[0].offsetWidth;
    if (index === imgMainLength - 1) {
      index = 0;
      listImage.style.transform = `translateX(0px)`;
    } else {
      index++;
      listImage.style.transform = `translateX(${-widthSliderMain * index}px)`;
    }
  };
  let handleChangeSlideMain = setInterval(bannerSlideMain, 3000);

  nextBanner.addEventListener("click", () => {
    clearInterval(handleChangeSlideMain);
    bannerSlideMain();
    handleChangeSlideMain = setInterval(bannerSlideMain, 3000);
  });

  prevBanner.addEventListener("click", () => {
    let widthSliderMain = imgsMain[0].offsetWidth;
    if (index === 0) {
      index = imgMainLength - 1;
      listImage.style.transform = `translateX(${-widthSliderMain * index}px)`;
    } else {
      index--;
      listImage.style.transform = `translateX(${-widthSliderMain * index}px)`;
    }
  });
}