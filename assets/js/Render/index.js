function renderChild(renderChild, ...children) {
    return renderElement({
        container: null,
        tagName: renderChild.tagName,
        innerText: renderChild.innerText,
        attributes: renderChild.attributes
    }, ...children);
}
function renderElement(element, ...children) {
    const newElement = document.createElement(element.tagName);
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
export { renderChild, renderElement };
