import type {
    SQLMetadata,
    TableData,
    TableMetadata,
} from "../types/admin.js";

import {
    renderElement
} from "../Render/index.js";


function renderCreateSection(column: SQLMetadata) {
    const label = renderElement({
        tagName: "label",
        innerText: column.Field,
        attributes: {
            for: column.Field,
            class: "text-sm indent-2 opacity-50"
        }
    });

    // Informing if it's obrigatory
    if (column.Null === "NO") {
        label.innerText += ' *';
    }

    // Informing if it's the primary key
    if (column.Key === "PRI") {
        label.innerText += ' (Chave primária)';
    }

    // Informing if it auto increment
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
    }) as HTMLInputElement;

    // Informing if it's obrigatory
    if (column.Null === "NO") {
        input.setAttribute("required", "true");
    }

    // If it has a default value, define as it
    if (column.Default !== null) {
        input.setAttribute("value", column.Default);
    }

    // Informing if it auto increment
    if (column.Extra === "auto_increment") {
        input.setAttribute("disabled", "true");
        input.setAttribute("title", "Valor automático não pode ser alterado");
        input.classList.add("cursor-not-allowed");
        input.classList.add("bg-neutral-200");
    }

    // Defining the type of the input
    let type = column.Type.split("(")[0];

    switch (type) {
        // Normal numbers
        case "tinyint":
        case "smallint":
        case "mediumint":
        case "int":
        case "integer":
        case "bigint":
            input.setAttribute("type", "number");
            // Check for unsigned
            if (column.Type.includes("unsigned")) {
                input.setAttribute("min", "0");
            }
            break;
        
        // Decimal numbers
        case "decimal":
        case "numeric":
        case "float":
        case "double":
            input.setAttribute("type", "number");
            input.setAttribute("step", "0.01");
            break;
        
        // Strings
        case "char":
        case "varchar":
        case "tinytext":
        case "text":
        case "mediumtext":
        case "longtext":
            input.setAttribute("type", "text");
            // Check for max size
            let maxSize = column.Type.split("(")[1]?.split(")")[0];
            if (maxSize)
                input.setAttribute("maxlength",  maxSize);
            label.innerText += ' (Tamanho máximo: ' + maxSize + ')';
            break;
        
        // Dates and times
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
        
        // Default (text)
        default:
            input.setAttribute("type", "text");
            break;
    }

    const section = renderElement(
        {
            tagName: "div",
            attributes: {
                class: "flex flex-col gap-1"
            }
        },
        label,
        input
    );

    return section;
}


function getRegister(data: TableData, metadata: TableMetadata, pk: number) {
    return data.find((row: Record<string, any>) => row[metadata.pk] == pk) ?? {};
}

export {
    renderCreateSection,
    getRegister
};
