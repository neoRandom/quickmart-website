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
 * An object that describes a renderable HTML element without a container.
 */
type RenderElementWoContainer = Omit<RenderElement, 'container'>;

/**
 * An object that describes a renderable HTML element without inner text.
 */
type RenderElementWoInnerText = Omit<RenderElement, 'innerText'>;

/**
 * An object that describes a renderable HTML element without inner text and container.
 */
type RenderElementWoInnerTextAndContainer = Omit<RenderElement, 'innerText' | 'container'>;


export type {
    RenderElement,
    RenderElementWoContainer,
    RenderElementWoInnerText,
    RenderElementWoInnerTextAndContainer
}
