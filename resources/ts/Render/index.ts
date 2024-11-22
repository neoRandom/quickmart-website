import type {
    RenderElement, 
    RenderChild
} from './types.ts';


/**
 * Creates a new HTML element with the given attributes and adds it to the
 * given container if one is provided. The element is also populated with the
 * given children.
 * 
 * @param renderChild The child element to create and add to the container.
 * @param children The children to add to the element.
 * @returns The created element.
 */
function renderChild(
    renderChild: RenderChild, 
    ...children: HTMLElement[]
) {
    return renderElement(
        {
            container: null, 
            tagName: renderChild.tagName, 
            innerText: renderChild.innerText, 
            attributes: renderChild.attributes
        }, 
        ...children
    );
}


/**
 * Creates a new HTML element with the given attributes and adds it to the
 * given container if one is provided. The element is also populated with the
 * given children.
 * 
 * @param element The element to create and add to the container.
 * @param children The children to add to the element.
 * @returns The created element.
 */
function renderElement(
    element: RenderElement, 
    ...children: HTMLElement[]
) {
    const newElement = document.createElement(element.tagName) as HTMLElement;

    if (element.innerText !== "")
        newElement.innerText = element.innerText;

    Object.keys(element.attributes).forEach(key => {
        if (element.attributes[key] !== undefined)
            newElement.setAttribute(key, element.attributes[key]);
    });

    for (let child of children) {
        newElement.appendChild(child);
    }

    if (element.container !== null)
        element.container.appendChild(newElement);

    return newElement;
}


export {
    renderChild, 
    renderElement
};
