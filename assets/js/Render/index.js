function renderElement(element, ...children) {
    const newElement = document.createElement(element.tagName);
    if ('innerText' in element && element.innerText !== "")
        newElement.innerText = element.innerText;
    Object.keys(element.attributes).forEach(key => {
        if (element.attributes[key] !== undefined)
            newElement.setAttribute(key, element.attributes[key]);
    });
    for (let child of children)
        newElement.appendChild(child);
    if ('container' in element && element.container !== null)
        element.container.appendChild(newElement);
    return newElement;
}
function renderTag(tagName, ...children) {
    const newElement = document.createElement(tagName);
    for (let child of children)
        newElement.appendChild(child);
    return newElement;
}
export { renderElement, renderTag };
