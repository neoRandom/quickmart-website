import type { 
    TableData,
    TableMetadata 
} from "../types/admin.js";

import { renderElement } from "../Render/index.js";

import {
    getRegister,
    generateCreateSection,
    generateInput,
    generateModal
} from "./utils.js";

import { 
    postCreate, 
    postCreateUser, 
    postDelete, 
    postEdit 
} from "../data/admin/post.js";


let metadata: TableMetadata;

/* Used in edition related functions
 *
 * Edition have two states: editing and not editing
 * When editing, the form is shown and the li is hidden
 * Also, the dropdown is replaced with a new one with different buttons
 * 
 * When the transition happen, the li and the original dropdown are cached
 * When the form is closed, the li is restored and the dropdown is replaced
 * 
 * The form and the new dropdown are generated dynamically every time a record is edited
 */
let editing: number = -1;  // Stores the key of the record being edited
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
                submit: (e: Event) => postCreate(e, metadata, deleteModal)
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
                submit: (e: Event) => postCreateUser(e, metadata, deleteModal)
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
                submit: (e) => postEdit(e, metadata, hideEdit)
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
                    postEdit(e, metadata, hideEdit);
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
            click: () => postDelete(metadata, deleteModal, key)
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


export {
    showCreate,
    showCreateUser,
    showDetails,
    showEdit,
    showDelete,
    hideEdit
};
