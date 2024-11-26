import type { 
    TableData,
    TableMetadata 
} from "../types/admin.js";

import {
    renderElement,
    renderNotification
} from "../Render/index.js";

import {
    getRegister,
    generateCreateSection,
    generateInput,
    generateModal
} from "./utils.js";

import renderContent from "./renderContent.js";
import { NotificationType } from "../enum/render.js";


let metadata: TableMetadata;

let editing: number = -1;
let cachedLI: HTMLLIElement;
let cachedDropdown: HTMLDivElement;


/**
 * Creates a modal for creating a new record in the table.
 * 
 * This function initializes a modal with a form populated with fields based on the table metadata.
 * It includes a submit button to create the record and a cancel button to close the modal.
 * 
 * @param {TableMetadata} new_metadata - The metadata of the table for which a new record is being created.
 */
function showCreate(new_metadata: TableMetadata) {
    metadata = new_metadata;

    let {
        modal,
        deleteModal
    } = generateModal();

    const cancelButton = renderElement({
        tagName: "button",
        innerText: "Cancelar",
        attributes: {
            type: "button",
            class: "py-2 hover:underline",
        },
        events: {
            click: deleteModal
        }
    });

    modal.classList.add("max-h-[80%]", "min-w-[640px]");

    // Header
    renderElement(
        {
            container: modal,
            tagName: "div",
            attributes: {
                class: `
                    flex items-center justify-between 
                    w-full h-fit px-4 py-2
                    border-b-2 border-primary-dark border-opacity-50
                `
            }
        },
        renderElement({
            tagName: "h2",
            innerText: `Criar ${metadata.name}`,
            attributes: {
                class: "text-2xl"
            }
        }),
        cancelButton
    );

    // Body
    renderElement(
        {
            container: modal,
            tagName: "form",
            attributes: {
                class: "flex-1 flex flex-col gap-4 p-4 overflow-y-auto",
                action: "",
                method: "POST"
            },
            events: {
                submit: (e: Event) => postCreate(e, deleteModal)
            }
        },
        ...metadata.rows.map((column) => {
            return generateCreateSection(column);
        }),
        renderElement({
            tagName: "button",
            innerText: "Criar",
            attributes: {
                type: "submit",
                class: `
                    text-white 
                    w-3/4 mx-auto 
                    mt-6 p-3 
                    bg-primary hover:bg-primary-dark 
                    rounded-md transition-colors
                `
            }
        })
    );
}


function showCreateUser(new_metadata: TableMetadata) {
    metadata = new_metadata;

    if (metadata.rows.length < 4)
        return;

    let {
        modal,
        deleteModal
    } = generateModal();

    const cancelButton = renderElement({
        tagName: "button",
        innerText: "Cancelar",
        attributes: {
            type: "button",
            class: "py-2 hover:underline",
        },
        events: {
            click: deleteModal
        }
    });

    modal.classList.add("max-h-[80%]", "min-w-[640px]");

    // Removes hash and salt to put password instead, becoming ["cod_credencial", "usuario", "senha", "cod_acesso"]
    let new_columns = [...metadata.rows];  // Shallow copy but different reference
    new_columns[2] = {
        Field: "senha",
        Type: "varchar(64)",
        Null: "NO",
        Key: "",
        Default: null,
        Extra: ""
    };
    new_columns[3] = new_columns[4]!;
    new_columns.pop();

    // Header
    renderElement(
        {
            container: modal,
            tagName: "div",
            attributes: {
                class: `
                    flex items-center justify-between 
                    w-full h-fit px-4 py-2
                    border-b-2 border-primary-dark border-opacity-50
                `
            }
        },
        renderElement({
            tagName: "h2",
            innerText: `Criar ${metadata.name}`,
            attributes: {
                class: "text-2xl"
            }
        }),
        cancelButton
    );

    // Body
    renderElement(
        {
            container: modal,
            tagName: "form",
            attributes: {
                class: "flex-1 flex flex-col gap-4 p-4 overflow-y-auto",
                action: "",
                method: "POST"
            },
            events: {
                submit: (e: Event) => postCreateUser(e, deleteModal)
            }
        },
        ...new_columns.map((column) => {
            return generateCreateSection(column);
        }),
        renderElement({
            tagName: "button",
            innerText: "Gerar Usuário (com hash e salt)",
            attributes: {
                type: "submit",
                class: `
                    text-white 
                    w-3/4 mx-auto 
                    mt-6 p-3 
                    bg-primary hover:bg-primary-dark 
                    rounded-md transition-colors
                `
            }
        })
    );
}


/**
 * Creates a modal for showing details of a record.
 * 
 * @param {TableMetadata} new_metadata - The metadata of the table.
 * @param {TableData} data - The data of the table.
 * @param {number} key - The key of the record to be shown.
 */
function showDetails(new_metadata: TableMetadata, data: TableData, key: number) {
    metadata = new_metadata;

    let register = getRegister(data, metadata, key);

    let {
        modal,
        deleteModal
    } = generateModal();

    const cancelButton = renderElement({
        tagName: "button",
        innerText: "Cancelar",
        attributes: {
            type: "button",
            class: "py-2 hover:underline",
        },
        events: {
            click: deleteModal
        }
    });

    modal.classList.add("max-h-[80%]", "min-w-[640px]");

    // Header
    renderElement(
        {
            container: modal,
            tagName: "div",
            attributes: {
                class: `
                    flex items-center justify-between 
                    w-full h-fit px-4 py-2
                    border-b-2 border-primary-dark border-opacity-50
                `
            }
        },
        renderElement({
            tagName: "h2",
            innerText: `Detalhes do registro ${key}`,
            attributes: {
                class: "text-2xl"
            }
        }),
        cancelButton
    );

    // Body
    renderElement(
        {
            container: modal,
            tagName: "div",
            attributes: {
                class: "flex-1 flex flex-col divide-y p-4 overflow-y-auto"
            }
        },
        ...metadata.rows.map((column) => 
            renderElement(
                {
                    tagName: "div",
                    attributes: {
                        class: "flex flex-col gap-2 py-2"
                    }
                },
                renderElement({
                    tagName: "span",
                    innerText: `${column.Field}:`,
                    attributes: {
                        class: "opacity-50 text-sm"
                    }
                }),
                renderElement({
                    tagName: "p",
                    innerText: register[column.Field],
                    attributes: {
                        class: "text-sm text-wrap break-all"
                    }
                })
            )
        )
    );
}


function showEdit(new_metadata: TableMetadata, data: TableData, dropdown: HTMLDivElement, key: number) {
    metadata = new_metadata;

    if (editing !== -1)
        hideEdit();
    
    editing = key;

    let register = getRegister(data, metadata, key);

    // Changing the table row from li to form and caching the li to restore it when the form is closed
    let li = document.querySelector(`#row-id-${key}`) as HTMLLIElement;

    const form = renderElement(
        {
            tagName: "form",
            attributes: {
                id: `edit-id-${key}`,
                class: "grid gap-x-2",
                style: `grid-template-columns: repeat(${metadata.sizes.total}, minmax(0, 1fr));`,
                action: "",
                method: "POST"
            },
            events: {
                submit: postEdit
            }
        },
        ...Object.keys(register).map((key, i) => 
            generateInput(
                metadata.rows[i]!,
                {
                    id: key,
                    name: key,
                    value: register[key],
                    style: `grid-column: span ${metadata.sizes.columns[i]} / span ${metadata.sizes.columns[i]};` 
                }
            )
        )
    );
    
    li.replaceWith(form);
    cachedLI = li;

    // Changing the button container dropdown and caching the old to replace later
    const newDropdown = renderElement(
        {
            tagName: "div",
            attributes: { 
                id: `dropdown-id-${key}`,
                class: "hidden admin-dropdown-menu"
            }
        },
        renderElement(
            {
                tagName: "input",
                attributes: {
                    type: "submit",
                    form: `edit-id-${key}`,
                    value: "Salvar",
                    class: "text-left cursor-pointer"
                }
            }
        ),
        renderElement(
            {
                tagName: "button",
                attributes: {
                    type: "button"
                },
                events: {
                    "click": () => {
                        showAdvancedEdit(register);
                    }
                }
            },
            renderElement({
                tagName: "p",
                innerText: "Avançado"
            })
        ),
        renderElement(
            {
                tagName: "button",
                attributes: {
                    type: "button"
                },
                events: {
                    "click": () => {
                        hideEdit();
                    }
                }
            },
            renderElement({
                tagName: "p",
                innerText: "Cancelar"
            })
        )
    ) as HTMLDivElement;

    dropdown.replaceWith(newDropdown);
    cachedDropdown = dropdown;
}


function hideEdit() {
    if (editing === -1)
        return;

    let form = document.querySelector(`#edit-id-${editing}`) as HTMLFormElement;
    let dropdown = document.querySelector(`#dropdown-id-${editing}`) as HTMLDivElement;

    if (form === null || cachedLI === null || dropdown === null || cachedDropdown === null)
        return;

    form.replaceWith(cachedLI);
    dropdown.replaceWith(cachedDropdown);

    editing = -1;
}


function showAdvancedEdit(register: Record<string, string>) {
    let {
        modal,
        deleteModal
    } = generateModal();

    const cancelButton = renderElement({
        tagName: "button",
        innerText: "Cancelar",
        attributes: {
            type: "button",
            class: "py-2 hover:underline",
        },
        events: {
            click: deleteModal
        }
    });

    modal.classList.add("max-h-[80%]", "min-w-[640px]");

    // Header
    renderElement(
        {
            container: modal,
            tagName: "div",
            attributes: {
                class: `
                    flex items-center justify-between 
                    w-full h-fit px-4 py-2
                    border-b-2 border-primary-dark border-opacity-50
                `
            }
        },
        renderElement({
            tagName: "h2",
            innerText: `Atualizar ${metadata.name}`,
            attributes: {
                class: "text-2xl"
            }
        }),
        cancelButton
    );

    // Body
    renderElement(
        {
            container: modal,
            tagName: "form",
            attributes: {
                class: "flex-1 flex flex-col gap-4 p-4 overflow-y-auto",
                action: "",
                method: "POST"
            },
            events: {
                submit: (e: Event) => {
                    postEdit(e);
                    deleteModal();
                }
            }
        },
        ...metadata.rows.map((column) => {
            return generateCreateSection(column, register[column.Field]);
        }),
        renderElement({
            tagName: "button",
            innerText: "Atualizar",
            attributes: {
                type: "submit",
                class: `
                    text-white 
                    w-3/4 mx-auto 
                    mt-6 p-3 
                    bg-primary hover:bg-primary-dark 
                    rounded-md transition-colors
                `
            }
        })
    );
}


/**
 * Creates a modal for the user to confirm the deletion of a record.
 * 
 * @param {TableMetadata} new_metadata - The metadata of the table.
 * @param {number} key - The key of the record to be deleted.
 */
function showDelete(new_metadata: TableMetadata, key: number) {
    metadata = new_metadata;

    let {
        modal,
        deleteModal
    } = generateModal();

    const acceptButton = renderElement({
        tagName: "button",
        innerText: "Deletar",
        attributes: {
            type: "button",
            class: `
                text-white 
                px-2 py-1
                bg-red-600 hover:bg-red-700
                rounded-md transition-colors
            `
        },
        events: {
            click: () => postDelete(deleteModal, key)
        }
    });

    const cancelButton = renderElement({
        tagName: "button",
        innerText: "Cancelar",
        attributes: {
            type: "button",
            class: "px-2 py-1 hover:underline",
        },
        events: {
            click: deleteModal
        }
    });

    renderElement(
        {
            container: modal,
            tagName: "div",
            attributes: {
                class: `flex flex-col gap-4 w-fit`
            }
        },
        renderElement({
            tagName: "h2",
            innerText: `Deletar ${metadata.name}`,
            attributes: {
                class: "text-center text-2xl pb-2 border-b-2 border-secondary border-opacity-50"
            }
        }),
        renderElement({
            tagName: "p",
            innerText: `Você realmente deseja deletar o registro ${key}?`,
            attributes: {
                class: "text-center"
            }
        }),
        renderElement(
            {
                tagName: "div",
                attributes: {
                    class: "flex gap-4 *:flex-1"
                }
            },
            acceptButton,
            cancelButton
        )
    );
}


// Functions to post to the server

/**
 * Sends a POST request to the server to insert a new record in the database.
 * 
 * @param {Event} e - The event that triggered the function.
 * @param {() => void} deleteModal - A function that closes the modal.
 * 
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating
 * whether the request was successful.
 */
async function postCreate(e: Event, deleteModal: () => void) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    formData.append("id", metadata.index.toString());

    // Convert FormData to a plain object
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
        if (typeof value === 'string') {
            data[key] = value;
        }
    });

    try {
        // Make the POST request
        const response = await fetch(
            'insert/', // For some unholy reason, the URL must end with a slash
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify JSON content type
                },
                body: JSON.stringify(data), // Convert data to JSON format
            }
        );

        // Handle the response
        if (response.ok) {
            // const result = await response.json(); // Parse the JSON response
            // console.log('Success:', result);
            renderContent(document.querySelector("#structure") as HTMLElement, metadata);
            renderNotification('Dados registrados com sucesso!', NotificationType.Success);
            deleteModal();
        } else {
            // const error = await response.json();
            // console.error('Error:', error);
            renderNotification('Ocorreu um erro ao tentar inserir os dados.', NotificationType.Error);
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        renderNotification("Um erro inesperado ocorreu", NotificationType.Error);
    }

    return false;
}


async function postCreateUser(e: Event, deleteModal: () => void) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    formData.append("id", metadata.index.toString());

    // Convert FormData to a plain object
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
        if (typeof value === 'string') {
            data[key] = value;
        }
    });

    try {
        // Make the POST request
        const response = await fetch(
            'create_user/', // For some unholy reason, the URL must end with a slash
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify JSON content type
                },
                body: JSON.stringify(data), // Convert data to JSON format
            }
        );

        // Handle the response
        if (response.ok) {
            // const result = await response.json(); // Parse the JSON response
            // console.log('Success:', result);
            renderContent(document.querySelector("#structure") as HTMLElement, metadata);
            renderNotification('Usuário criado com sucesso!', NotificationType.Success);
            deleteModal();
        } else {
            // const error = await response.json();
            // console.error('Error:', error);
            renderNotification('Ocorreu um erro ao tentar criar o usuário.', NotificationType.Error);
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        renderNotification("Um erro inesperado ocorreu", NotificationType.Error);
    }

    return false;
}


async function postEdit(e: Event) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    formData.append("id", metadata.index.toString());

    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
        if (typeof value === 'string') {
            data[key] = value;
        }
    });

    hideEdit();

    try {
        // Make the POST request
        const response = await fetch(
            'update/', // For some unholy reason, the URL must end with a slash
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify JSON content type
                },
                body: JSON.stringify(data), // Convert data to JSON format
            }
        );

        // Handle the response
        if (response.ok) {
            // const result = await response.json(); // Parse the JSON response
            // console.log('Success:', result);
            renderContent(document.querySelector("#structure") as HTMLElement, metadata);
            renderNotification('Dados alterados com sucesso!', NotificationType.Success);
        } else {
            // const error = await response.json();
            // console.error('Error:', error);
            renderNotification('Ocorreu um erro ao tentar alterar os dados.', NotificationType.Error);
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        renderNotification("Um erro inesperado ocorreu", NotificationType.Error);
    }

    return false;
}


/**
 * Sends a POST request to the server to delete a record from the database.
 *
 * @param {() => void} deleteModal - A function that closes the modal.
 * @param {number} key - The value of the primary key of the record to be deleted.
 *
 * @returns {Promise<void>} A promise that resolves when the request has finished.
 */
async function postDelete(deleteModal: () => void, key: number) {
    const formData = new FormData();

    formData.append("id", metadata.index.toString());

    for (let column of metadata.rows) {
        if (column.Key === "PRI") {
            formData.append(`${column.Field}`, key.toString());
            break;
        }
    }

    // Convert FormData to a plain object
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
        if (typeof value === 'string') {
            data[key] = value;
        }
    });

    try {
        // Make the POST request
        const response = await fetch(
            'delete/', // For some unholy reason, the URL must end with a slash
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify JSON content type
                },
                body: JSON.stringify(data), // Convert data to JSON format
            }
        );

        // Handle the response
        if (response.ok) {
            // const result = await response.json(); // Parse the JSON response
            // console.log('Success:', result);
            renderContent(document.querySelector("#structure") as HTMLElement, metadata);
            renderNotification('Dados deletados com sucesso!', NotificationType.Success);
            deleteModal();
        } else {
            // console.error('Error:', await response.text());
            renderNotification('Ocorreu um erro ao deletar os dados', NotificationType.Error);
        }
    } catch (error) {
        // console.error('Error:', error);
        renderNotification('Ocorreu um erro ao deletar os dados', NotificationType.Error);
    }
}


export {
    showCreate,
    showCreateUser,
    showDetails,
    showEdit,
    showDelete,
    hideEdit
};
