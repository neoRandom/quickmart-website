import { renderElement } from "../Render/index.js";
function renderCreateSection(column) {
    var _a;
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
    const input = renderElement({
        tagName: "input",
        attributes: {
            id: column.Field,
            name: column.Field,
            value: (column.Default === null) ? "" : column.Default,
            class: `
                px-2 py-1.5 
                bg-neutral-100 
                border border-primary border-opacity-10 focus:border-opacity-100
                rounded-md outline-none transition-colors
            `
        }
    });
    if (column.Null === "NO") {
        input.setAttribute("required", "true");
    }
    if (column.Default !== null) {
        input.setAttribute("value", column.Default);
    }
    if (column.Extra === "auto_increment") {
        input.setAttribute("disabled", "true");
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
            label.innerText += ' (Tamanho máximo: ' + maxSize + ')';
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
    const section = renderElement({
        tagName: "div",
        attributes: {
            class: "flex flex-col gap-1"
        }
    }, label, input);
    return section;
}
export { renderCreateSection };
