import { renderElement } from "../Render/index.js";
function generateModal() {
    function deleteModal() {
        modal.classList.remove("translate-y-0");
        modal.classList.add("translate-y-[100vh]");
        container.classList.remove("bg-opacity-50");
        setTimeout(() => {
            container.remove();
        }, 500);
    }
    const modal = renderElement({
        tagName: "div",
        attributes: {
            class: `
                flex flex-col
                max-w-[80%] p-4 bg-white rounded-md 
                shadow-md 
                translate-y-[100vh] 
                transition-transform duration-500
            `,
            style: "z-index: 101;"
        }
    });
    const container = renderElement({
        container: document.body,
        tagName: "div",
        attributes: {
            class: `
                    absolute top-0 left-0 
                    flex items-center justify-center 
                    w-full h-full 
                    bg-black bg-opacity-0 
                    overflow-hidden
                    transition-colors duration-500
                `,
            style: "z-index: 100;"
        }
    }, modal);
    setTimeout(() => {
        modal.classList.add("translate-y-0");
        modal.classList.remove("translate-y-[100vh]");
        container.classList.add("bg-opacity-50");
    }, 0);
    return {
        modal,
        deleteModal
    };
}
function generateCreateSection(column) {
    const label = renderElement({
        tagName: "label",
        innerText: column.Field,
        attributes: {
            for: column.Field,
            class: "text-sm indent-2 opacity-50"
        }
    });
    if (column.Null === "NO") {
        label.innerText += ' *';
    }
    if (column.Key === "PRI") {
        label.innerText += ' (Chave primária)';
    }
    if (column.Extra === "auto_increment") {
        label.innerText += ' (Auto increment)';
    }
    const input = generateInput(column, {
        id: column.Field,
        name: column.Field,
        value: (column.Default === null) ? "" : column.Default,
        class: `
                px-2 py-1.5 
                bg-neutral-100 
                border border-primary border-opacity-10 focus:border-opacity-100
                rounded-md outline-none transition-colors
            `
    });
    if (input.getAttribute("type") === "text" && input.getAttribute("maxlength") !== null) {
        label.innerText += ' (Tamanho máximo: ' + input.getAttribute("maxlength") + ')';
    }
    const section = renderElement({
        tagName: "div",
        attributes: {
            class: "flex flex-col gap-1"
        }
    }, label, input);
    return section;
}
function generateInput(column, attributes) {
    var _a;
    const input = renderElement({
        tagName: "input",
        attributes: attributes
    });
    if (column.Null === "NO") {
        input.setAttribute("required", "true");
    }
    if (column.Default !== null) {
        input.setAttribute("value", column.Default);
    }
    if (column.Extra === "auto_increment") {
        input.setAttribute("readonly", "true");
        input.setAttribute("title", "Valor automático não pode ser alterado");
        input.classList.add("cursor-not-allowed");
        input.classList.add("bg-neutral-200");
    }
    let type = column.Type.split("(")[0];
    switch (type) {
        case "tinyint":
        case "smallint":
        case "mediumint":
        case "int":
        case "integer":
        case "bigint":
            input.setAttribute("type", "number");
            if (column.Type.includes("unsigned")) {
                input.setAttribute("min", "0");
            }
            break;
        case "decimal":
        case "numeric":
        case "float":
        case "double":
            input.setAttribute("type", "number");
            input.setAttribute("step", "0.01");
            break;
        case "char":
        case "varchar":
        case "tinytext":
        case "text":
        case "mediumtext":
        case "longtext":
            input.setAttribute("type", "text");
            let maxSize = (_a = column.Type.split("(")[1]) === null || _a === void 0 ? void 0 : _a.split(")")[0];
            if (maxSize)
                input.setAttribute("maxlength", maxSize);
            break;
        case "datetime":
            input.setAttribute("type", "datetime-local");
            break;
        case "date":
            input.setAttribute("type", "date");
            break;
        case "time":
            input.setAttribute("type", "time");
            break;
        case "timestamp":
            input.setAttribute("type", "datetime-local");
            break;
        case "year":
            input.setAttribute("type", "number");
            break;
        default:
            input.setAttribute("type", "text");
            break;
    }
    return input;
}
function getRegister(data, metadata, pk) {
    var _a;
    return (_a = data.find((row) => row[metadata.pk] == pk)) !== null && _a !== void 0 ? _a : {};
}
export { generateModal, generateCreateSection, getRegister, generateInput };
