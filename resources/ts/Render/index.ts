import type {
    RenderElement
} from '../types/render.js';


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
    element: 
        RenderElement, 
    ...children: HTMLElement[]
) {
    // Creating the element
    const newElement = document.createElement(element.tagName) as HTMLElement;

    // Inserting the inner text, if it exists
    if ('innerText' in element && element.innerText !== "")
        newElement.innerText = element.innerText as string;

    // Setting the attributes, if they exist
    Object.keys(element.attributes ?? {}).forEach(key => {
        if (element.attributes?.[key] !== undefined)
            newElement.setAttribute(key, element.attributes[key]);
    });

    // Adding the events, if they exist
    Object.keys(element.events ?? {}).forEach(key => {
        if (element.events?.[key] !== undefined)
            newElement.addEventListener(key, element.events[key]);
    });

    // Appending the childs, if is any
    for (let child of children)
        newElement.appendChild(child);

    // Adding it to the container, if it exists
    if ('container' in element && element.container !== null)
        element.container?.appendChild(newElement);

    // Returning the reference to the element created
    return newElement;
}


/**
 * Creates a new HTML element. The element is also populated with the given children.
 * 
 * @param tagName The tag name of the element to create.
 * @param children The children to add to the element.
 * @returns The created HTMLElement.
 */
function renderTag(tagName: string, ...children: HTMLElement[]): HTMLElement {
    const newElement = document.createElement(tagName) as HTMLElement;

    for (let child of children)
        newElement.appendChild(child);

    return newElement;
}


export {
    renderElement,
    renderTag
};
