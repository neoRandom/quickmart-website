/**
 * An object that describes a renderable HTML element.
 * 
 * @prop {HTMLElement | null} container - The container element to add the new element to.
 * @prop {string} tagName - The tag name of the element.
 * @prop {string} innerText - The inner text of the element.
 * @prop {Record<string, string>} attributes - The attributes of the element.
 */
type RenderElement = {
    container: HTMLElement | null,
    tagName: string,
    innerText: string,
    attributes: Record<string, string>
};


/**
 * An object that describes a renderable HTML element that is a child of another element.
 * 
 * @prop {string} tagName - The tag name of the element.
 * @prop {string} innerText - The inner text of the element.
 * @prop {Record<string, string>} attributes - The attributes of the element.
 */
type RenderChild = {
    tagName: string,
    innerText: string,
    attributes: Record<string, string>
};


export type {
    RenderElement,
    RenderChild
}
