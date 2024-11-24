/**
 * An object that describes a renderable HTML element.
 * 
 * @prop {HTMLElement} container - The container element to add the new element to.
 * @prop {string} tagName - The tag name of the element.
 * @prop {string} innerText - The inner text of the element.
 * @prop {Record<string, string>} attributes - The attributes of the element.
 * @prop {Record<string, ((e: Event) => void) | (() => void)>} events - The event listeners to add to the element.
 */
type RenderElement = {
    container?: HTMLElement;
    tagName: string;
    innerText?: string;
    attributes?: Record<string, string>;
    events?: Record<
        string,
        ((e: Event) => void) | (() => void)
    >;
};


export type {
    RenderElement
}
