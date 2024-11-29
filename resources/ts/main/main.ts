import ImageSlider from "./components/class/ImageSlider.js";
import renderProductSlider from "./components/ProductSlider.js";
import { productsListData } from "./data/products.js";

///////////////////////////////////////////////////
// PAGE LOADER ====================================
///////////////////////////////////////////////////

document.body.onload = (() => {
    document.body.style.display = "";
});

///////////////////////////////////////////////////
// SECTION LOADER ================================
///////////////////////////////////////////////////

// Image Slider ==================================
let imageSlider = new ImageSlider(document.querySelector("#image-slider-container") as HTMLElement);

imageSlider.cycle();

document.querySelector("#image-slider-right-button")
?.addEventListener("click", () => {
    imageSlider.next();
});

document.querySelector("#image-slider-left-button")
?.addEventListener("click", () => {
    imageSlider.previous();
});

// Produt Slider =================================
const { section: section1 } = renderProductSlider(
    "Mais vendidos da semana", 
    "#", 
    1,
    productsListData
);

const { section: section2 } = renderProductSlider(
    "Talvez você goste", 
    "#", 
    1,
    productsListData
);

document.querySelector("body > main")?.appendChild(section1);
document.querySelector("body > main")?.appendChild(section2);
