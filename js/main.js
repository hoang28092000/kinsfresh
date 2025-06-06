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
  loadPartial("contact-second", "../partials/contact-second.html");
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

// slide-main
const listImage = document.querySelector(
  ".main .banner-main .slider .list-img"
);
const imgsMain = document.querySelectorAll(".main .banner-main .slider img");
const prevBanner = document.querySelector(".banner-main .prev");
const nextBanner = document.querySelector(".banner-main .next");
const imgMainLength = imgsMain.length;
let index = 0;
 const bannerSlideMain = () => {
   if (index == imgMainLength - 1) {
    index = 0;
    let widthSliderMain = imgsMain[0].offsetWidth;
    listImage.style.transform = `translateX(${0}px)`;
  } else {
    index++;
    let widthSliderMain = imgsMain[0].offsetWidth;
    listImage.style.transform = `translateX(${widthSliderMain * -1 * index}px)`;
  }
 }
let handleChangeSlideMain = setInterval(bannerSlideMain, 3000);

nextBanner.addEventListener("click" , () => {
  clearInterval(handleChangeSlideMain)
  bannerSlideMain();
  handleChangeSlideMain = setInterval(bannerSlideMain, 3000)
});

prevBanner.addEventListener('click' , () => {
  if (index == 0) {
    index = length - 1 ;
    let widthSliderMain = imgsMain[0].offsetWidth;
    listImage.style.transform = `translateX(${widthSliderMain * -1 * index}px)`;
  } else {
    index--;
    let widthSliderMain = imgsMain[0].offsetWidth;
    listImage.style.transform = `translateX(${widthSliderMain * -1 * index}px)`;
  }
})

// nav-dropDown
const dropNavbar = document.querySelector(".nav_category-list");
const btnDrop = document.querySelector("#drop-nav");
btnDrop.addEventListener("click", (e) => {
  if (window.innerWidth < 992) {
    e.preventDefault();
    dropNavbar.classList.toggle("open");
    btnDrop.classList.toggle("rotate");
  }
});
