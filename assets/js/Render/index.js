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
function renderNotification(message, type, timeout = 4000) {
    let notification = renderElement({
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
    });
    let container = renderElement({
        container: document.body,
        tagName: "div",
        attributes: {
            class: `
                    absolute bottom-10 right-10 overflow-hidden
                `
        }
    }, notification);
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
export { renderElement, renderTag, renderNotification };
