import ImageSlider from "../classes/ImageSlider.js";
import renderProductSlider from "../components/ProductSlider.js";
import { productsListData } from "../data/products.js";

///////////////////////////////////////////////////
// PAGE LOADER ====================================
///////////////////////////////////////////////////

document.body.onload = (() => {
    document.body.style.display = "";
});

///////////////////////////////////////////////////
// SECTION LOADER ================================
///////////////////////////////////////////////////

function sectionLoader() {
    let sections: Set<HTMLElement> = new Set();

    const sectionContainer = document.querySelector("body > main") as HTMLDivElement;

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
    sections.add(renderProductSlider(
        "Mais vendidos da semana", 
        "#", 
        1,
        productsListData
    ).section);

    sections.add(renderProductSlider(
        "Talvez você goste", 
        "#", 
        1,
        productsListData
    ).section);

    sections.forEach((section: HTMLElement) => {
        sectionContainer.appendChild(section);
    });
}

sectionLoader();
