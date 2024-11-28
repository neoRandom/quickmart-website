import { NotificationType } from '../enum/render.js';
import {
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
    ...children: (HTMLElement | null)[]
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
        if (child !== null)
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


/**
 * Renders a notification message in the bottom right corner of the screen.
 * The notification is removed after a given timeout.
 * 
 * @param message The message to display in the notification.
 * @param timeout The time in milliseconds to wait before removing the notification.
 *                Defaults to 5000 (5 seconds).
 */
function renderNotification(message: string, type: NotificationType, timeout: number = 4000) {
    let notification = renderElement(
        {
            tagName: "div",
            innerText: message,
            attributes: {
                class: `
                    z-50 translate-x-full
                    pl-2 pr-4 py-2 border-l-8 rounded-sm shadow-md
                    text-white cursor-pointer select-none
                    transition-all duration-1000
                `
            },
            events: {
                click: removeNotification
            }
        }
    ) as HTMLDivElement;

    let container = renderElement(
        {
            container: document.body,
            tagName: "div",
            attributes: {
                class: `
                    absolute bottom-10 right-10 overflow-hidden
                `
            }
        }, 
        notification
    );

    let active = true;

    switch (type) {
        case NotificationType.Success:
            notification.classList.add("bg-green-600", "border-green-700");
            break;
        case NotificationType.Error:
            notification.classList.add("bg-red-600", "border-red-700");
            break;
        case NotificationType.Warning:
            notification.classList.add("bg-yellow-600", "border-yellow-700");
            break;
    }

    setTimeout(() => {
        notification.classList.remove("translate-x-full");
    }, 0);

    function removeNotification() {
        active = false;
        notification.classList.add("translate-x-full");
        setTimeout(() => {
            container.remove();
        }, 1000);
    }

    setTimeout(() => {
        if (active)
            removeNotification();
    }, timeout);
}


export {
    renderElement,
    renderTag,
    renderNotification
};
