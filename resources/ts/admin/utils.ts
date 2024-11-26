import type {
    SQLMetadata,
    TableData,
    TableMetadata,
} from "../types/admin.js";

import {
    renderElement
} from "../Render/index.js";


/**
 * Creates a modal that can be used to show forms for creating or editing data.
 * 
 * @returns An object with two properties: `modal` and `deleteModal`.
 *  - `modal` is the HTML element of the modal.
 *  - `deleteModal` is a function that removes the modal from the DOM.
 */
function generateModal() {
    /**
     * Removes the modal from the DOM with a smooth transition.
     */
    function deleteModal() {
        // Start transition to hide modal
        modal.classList.remove("translate-y-0");
        modal.classList.add("translate-y-[100vh]");
        container.classList.remove("bg-opacity-50");
        
        // Remove the container after the transition ends
        setTimeout(() => {
            container.remove();
        }, 500);
    }

    // Create the modal element with specified styles
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

    // Create a container for the modal to manage its layout and background
    const container = renderElement(
        {
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
        },
        modal
    );

    // Delay the transition to make the animation smoother
    // For some reason, the setTimeout with 0 delay makes the animation smoother
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


function generateCreateSection(column: SQLMetadata, value: string | null = null) {
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
    ) as HTMLInputElement;

    if (input.getAttribute("type") === "text" && input.getAttribute("maxlength") !== null) {
        label.innerText += ' (Tamanho máximo: ' + input.getAttribute("maxlength") + ')';
    }

    if (value !== null)
        input.value = value;

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
    generateModal,
    generateCreateSection,
    getRegister,
    generateInput
};
