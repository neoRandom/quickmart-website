import { renderElement } from "../../Render/index.js";
import { ProductCard } from "../../types/main.js";
import ProductSlider from "./class/ProductSlider.js";

const buttonStyleClasses = "z-10 text-white text-lg font-semibold w-10 aspect-square rounded-md bg-primary hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"

function renderProductSlider(
    title: string,
    url: string,
    gap: number = 1,
    products: Array<ProductCard>
) {
    const leftButton = 
    renderElement({
        tagName: "button",
        innerText: "←",
        attributes: {
            type: "button",
            class: buttonStyleClasses,
        }
    }) as HTMLButtonElement;

    const rightButton = 
    renderElement({
        tagName: "button",
        innerText: "→",
        attributes: {
            type: "button",
            class: buttonStyleClasses,
        }
    }) as HTMLButtonElement;

    const productSliderElement =
    renderElement({
        tagName: "div",
        attributes: {
            class: "flex h-full px-4 transition-transform duration-500",
            style: `gap: ${gap}rem;`,
        }},
        ...products.map((product) => renderProductCard(product, gap))
    );

    // Root element (section)
    const section = 
    renderElement({
        tagName: "section",
        attributes: {
            class: "flex flex-col gap-8 h-[500px]",
        }},
        // Title and link
        renderElement({
            tagName: "div",
            attributes: {
                class: "flex items-center justify-between",
            }},
            renderElement({
                tagName: "h2",
                attributes: {
                    class: "font-semibold text-primary-dark text-xl w-fit transition-transform select-none hover:translate-x-1",
                },
                innerText: title,
            }),
            renderElement({
                tagName: "a",
                attributes: {
                    class: "text-primary font-semibold hover:underline",
                    href: url,
                },
                innerText: "Ver tudo",
            })
        ),
        // Slider container
        renderElement({
            tagName: "div",
            attributes: {
                class: "relative flex-1 py-2 overflow-x-hidden",
            }},
            // Slider buttons
            renderElement({
                tagName: "div",
                attributes: {
                    class: "absolute top-0 left-0 flex items-center justify-between w-full h-full",
                }},
                leftButton,
                rightButton
            ),
            // Products container
            productSliderElement
        )
    );

    const productSlider = new ProductSlider(
        productSliderElement,
        leftButton,
        rightButton,
        gap * 16,
        5
    );

    return { 
        section, 
        productSlider 
    };
}


function renderProductCard(product: ProductCard, gap: number) {
    // Product card (root element)
    const newCard = 
    renderElement({
        tagName: "div",
        attributes: {
            class: "group flex flex-col h-full p-4 default-border rounded-md hover:shadow-md hover:-translate-y-2 transition-all cursor-pointer",
            style: `min-width: calc(20% - ${gap}rem * 0.8);`,
        }},
        renderElement({
            tagName: "div",
            attributes: {
                class: "relative w-full",
            }},
            renderElement({
                tagName: "p",
                innerText: `-${product.discount}%`,
                attributes: {
                    class: "absolute font-semibold text-white m-2 px-2 py-1 bg-secondary rounded-md",
                }
            }),
            renderElement({
                tagName: "img",
                attributes: {
                    src: product.image,
                    alt: "",
                    class: "w-full aspect-[4/3] border-0",
                },
            })
        ),
        renderElement({
            tagName: "div",
            attributes: {
                class: "flex-1 flex flex-col gap-2 my-2",
            }},
            renderElement({
                tagName: "div",
                attributes: {
                    class: "flex flex-col gap-1 items-center",
                }},
                product.old_price ? renderElement({
                    tagName: "p",
                    innerText: product.old_price,
                    attributes: {
                        class: "text-sm line-through opacity-50",
                    }
                }) : null,
                renderElement({
                    tagName: "p",
                    innerText: `${product.price}`,
                    attributes: {
                        class: "text-xl text-primary font-bold",
                    }},
                    renderElement({
                        tagName: "span",
                        innerText: ` / ${product.unity}`,
                        attributes: {
                            class: "text-base font-normal uppercase",
                        }
                    })
                )
            ),
            renderElement({
                tagName: "p",
                attributes: {
                    class: "text-sm font-semibold px-1 truncate",
                },
                innerText: product.name,
            }),
            renderElement({
                tagName: "p",
                attributes: {
                    class: "text-sm opacity-90 break-words line-clamp-3",
                },
                innerText: product.description,
            })
        ),
        renderElement({
            tagName: "button",
            innerText: "Adicionar",
            attributes: {
                type: "button",
                class: "text-primary-dark w-full py-1 border-2 border-primary rounded-md transition-colors group-hover:bg-primary-dark group-hover:text-white",
            },
        })
    );

    return newCard;
}


export default renderProductSlider;
