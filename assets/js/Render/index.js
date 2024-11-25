import { NotificationType } from '../enum/render.js';
function renderElement(element, ...children) {
    var _a, _b, _c;
    const newElement = document.createElement(element.tagName);
    if ('innerText' in element && element.innerText !== "")
        newElement.innerText = element.innerText;
    Object.keys((_a = element.attributes) !== null && _a !== void 0 ? _a : {}).forEach(key => {
        var _a;
        if (((_a = element.attributes) === null || _a === void 0 ? void 0 : _a[key]) !== undefined)
            newElement.setAttribute(key, element.attributes[key]);
    });
    Object.keys((_b = element.events) !== null && _b !== void 0 ? _b : {}).forEach(key => {
        var _a;
        if (((_a = element.events) === null || _a === void 0 ? void 0 : _a[key]) !== undefined)
            newElement.addEventListener(key, element.events[key]);
    });
    for (let child of children)
        newElement.appendChild(child);
    if ('container' in element && element.container !== null)
        (_c = element.container) === null || _c === void 0 ? void 0 : _c.appendChild(newElement);
    return newElement;
}
function renderTag(tagName, ...children) {
    const newElement = document.createElement(tagName);
    for (let child of children)
        newElement.appendChild(child);
    return newElement;
}
function renderNotification(message, type, timeout = 5000) {
    const notification = renderElement({
        container: document.body,
        tagName: "div",
        innerText: message,
        attributes: {
            class: `
                    absolute bottom-10 right-10
                    px-4 py-2 rounded-md
                    text-white cursor-pointer
                `
        },
        events: {
            click: () => {
                notification.remove();
            }
        }
    });
    switch (type) {
        case NotificationType.Success:
            notification.classList.add("bg-green-600");
            break;
        case NotificationType.Error:
            notification.classList.add("bg-red-600");
            break;
        case NotificationType.Warning:
            notification.classList.add("bg-yellow-600");
            break;
    }
    setTimeout(() => {
        notification.remove();
    }, timeout);
}
export { renderElement, renderTag, renderNotification };
