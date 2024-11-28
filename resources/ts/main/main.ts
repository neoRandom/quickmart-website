import ImageSlider from "./components/class/ImageSlider.js";
import renderProductSlider from "./components/ProductSlider.js";

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
const { section } = renderProductSlider(
    "Mais vendidos da semana", 
    "#", 
    1,
    [
        {
            image: "/quickmart/assets/images/user.png",
            name: "Item 1",
            old_price: "R$ 20,00",
            price: "R$ 10,00",
            discount: "50",
            unity: "cada",
            description: "Descrição do produto 1",
            url: "#"
        },
        {
            image: "/quickmart/assets/images/item-2.png",
            name: "Item 2",
            price: "R$ 15,00",
            discount: "50",
            unity: "cada",
            description: "Descrição do produto 2",
            url: "#"
        },
        {
            image: "/quickmart/assets/images/item-3.png",
            name: "Item 3",
            old_price: "R$ 40,00",
            price: "R$ 20,00",
            discount: "50",
            unity: "cada",
            description: "Descrição do produto 3",
            url: "#"
        },
        {
            image: "/quickmart/assets/images/item-4.png",
            name: "Item 4",
            old_price: "R$ 50,00",
            price: "R$ 25,00",
            discount: "50",
            unity: "cada",
            description: "Descrição do produto 4",
            url: "#"
        },
        {
            image: "/quickmart/assets/images/item-5.png",
            name: "Item 5",
            old_price: "R$ 60,00",
            price: "R$ 30,00",
            discount: "50",
            unity: "cada",
            description: "Descrição do produto 5",
            url: "#"
        },
        {
            image: "/quickmart/assets/images/item-6.png",
            name: "Item 6",
            old_price: "R$ 70,00",
            price: "R$ 35,00",
            discount: "50",
            unity: "cada",
            description: "Descrição do produto 6",
            url: "#"
        }
    ]
);

document.querySelector("body > main")?.appendChild(section);
