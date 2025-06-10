// Gắn sự kiện menu sau khi header đã load xong
const menuBar = document.querySelector("#menu-bar");
const menu = document.querySelector(".navbar");

if (menuBar && menu) {
  menuBar.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

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
    index = (index + 1) % imgMainLength;
    listImage.style.transform = `translateX(${-widthSliderMain * index}px)`;
  };

  let handleChangeSlideMain = setInterval(bannerSlideMain, 3000);

  nextBanner.addEventListener("click", () => {
    clearInterval(handleChangeSlideMain);
    bannerSlideMain();
    handleChangeSlideMain = setInterval(bannerSlideMain, 3000);
  });

  prevBanner.addEventListener("click", () => {
    clearInterval(handleChangeSlideMain);
    let widthSliderMain = imgsMain[0].offsetWidth;
    index = index === 0 ? imgMainLength - 1 : index - 1;
    listImage.style.transform = `translateX(${-widthSliderMain * index}px)`;
    handleChangeSlideMain = setInterval(bannerSlideMain, 3000);
  });
}
