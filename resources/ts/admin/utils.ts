import type {
    SQLMetadata,
    TableData,
    TableMetadata,
} from "../types/admin.js";

import {
    renderElement
} from "../Render/index.js";


function generateCreateSection(column: SQLMetadata) {
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

    const input = generateInput(
        column, 
        {
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
    );

    if (input.getAttribute("type") === "text" && input.getAttribute("maxlength") !== null) {
        label.innerText += ' (Tamanho máximo: ' + input.getAttribute("maxlength") + ')';
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


/**
 * Renders an input HTML element based on the SQL column metadata and provided attributes.
 * 
 * The function determines the appropriate input type and attributes based on the SQL column
 * details such as whether the column can have null values, its default value, and if it's
 * an auto-incrementing field. It also adjusts attributes like `type`, `maxlength`, `min`, 
 * and `step` according to the column's data type.
 * 
 * @param column - The metadata of the SQL column, including details like data type,
 *                 nullability, default value, and extra attributes.
 * @param attributes - A record of attributes to apply to the input element.
 * 
 * @returns The created input HTML element with the configured attributes.
 */
function generateInput(column: SQLMetadata, attributes: Record<string, string>) {
    const input = renderElement({
        tagName: "input",
        attributes: attributes
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
        input.setAttribute("readonly", "true");
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

    return input;
}


function getRegister(data: TableData, metadata: TableMetadata, pk: number) {
    return data.find((row: Record<string, any>) => row[metadata.pk] == pk) ?? {};
}


export {
    generateCreateSection,
    getRegister,
    generateInput
};
