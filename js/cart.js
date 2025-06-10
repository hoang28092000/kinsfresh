const btnAdd = document.querySelector(".btn-next");
const btnMinus = document.querySelector(".btn-prev");
const number = document.querySelector(".number");
let counterValue = parseInt(number.textContent);

btnAdd.addEventListener("click", () => {
    if (counterValue >= 10) return 10;
    counterValue++;
    number.textContent = counterValue;
});
btnMinus.addEventListener("click", () => {
    if (counterValue <= 0) return 0;
    counterValue--;
    number.textContent = counterValue;
});
