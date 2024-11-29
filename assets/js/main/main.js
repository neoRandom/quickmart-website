var _a, _b, _c, _d;
import ImageSlider from "./components/class/ImageSlider.js";
import renderProductSlider from "./components/ProductSlider.js";
import { productsListData } from "./data/products.js";
document.body.onload = (() => {
    document.body.style.display = "";
});
let imageSlider = new ImageSlider(document.querySelector("#image-slider-container"));
imageSlider.cycle();
(_a = document.querySelector("#image-slider-right-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    imageSlider.next();
});
(_b = document.querySelector("#image-slider-left-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    imageSlider.previous();
});
const { section: section1 } = renderProductSlider("Mais vendidos da semana", "#", 1, productsListData);
const { section: section2 } = renderProductSlider("Talvez você goste", "#", 1, productsListData);
(_c = document.querySelector("body > main")) === null || _c === void 0 ? void 0 : _c.appendChild(section1);
(_d = document.querySelector("body > main")) === null || _d === void 0 ? void 0 : _d.appendChild(section2);
