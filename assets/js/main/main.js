import ImageSlider from "../classes/ImageSlider.js";
import renderProductSlider from "../components/ProductSlider.js";
import { productsListData } from "../data/products.js";
document.body.onload = (() => {
    document.body.style.display = "";
});
function sectionLoader() {
    var _a, _b;
    let sections = new Set();
    const sectionContainer = document.querySelector("body > main");
    let imageSlider = new ImageSlider(document.querySelector("#image-slider-container"));
    imageSlider.cycle();
    (_a = document.querySelector("#image-slider-right-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        imageSlider.next();
    });
    (_b = document.querySelector("#image-slider-left-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        imageSlider.previous();
    });
    sections.add(renderProductSlider("Mais vendidos da semana", "#", 1, productsListData).section);
    sections.add(renderProductSlider("Talvez você goste", "#", 1, productsListData).section);
    sections.forEach((section) => {
        sectionContainer.appendChild(section);
    });
}
sectionLoader();
