import type {
    TableData,
    TableMetadata,
    SQLMetadata
} from "../types/admin.js";

import {
    renderElement,
    renderNotification
} from "../Render/index.js";

import {
    hideEdit,
    showDelete,
    showDetails,
    showEdit
} from "./crud.js";
import { NotificationType } from "../enum/render.js";


let data: TableData;
let metadata: TableMetadata;

let cached_page: number = 0;
let cached_key: string = "";
let cached_search: string = "";


async function renderContent(container: HTMLElement, new_metadata: TableMetadata, page?: number, key?: string, search?: string) {
    metadata = new_metadata;

    // Fetch the data (registers) from the server
    let url = `get_registers/?id=${metadata.index}`;

    let per_page = undefined;
    if (localStorage.getItem("per_page") !== null)
        per_page = parseInt(localStorage.getItem("per_page") ?? "12");

    if (key === undefined) {
        if (cached_key !== undefined && cached_key !== "") {
            url += `&key=${cached_key}`;
        }
    }
    else if (key !== "") {
        url += `&key=${key}`;
    }

    if (search === undefined) {
        if (cached_search !== undefined && cached_search !== "") {
            url += `&value=${cached_search}`;
        }
    }
    else if (search !== "") {
        url += `&value=${search}`;
    }

    if (per_page !== undefined) {
        url += `&limit=${per_page}`;
        if (page !== undefined) {
            url += `&offset=${page * per_page}`;
        }
    }

    console.log(url);

    const payload = await fetch(url);
    if (payload.status !== 200) {
        renderNotification("Não foi possível carregar os dados da tabela.", NotificationType.Warning);
        return false;
    }

    data = await payload.json().catch((_) => {
        renderNotification("Não foi possível carregar os dados da tabela.", NotificationType.Warning);
        return false;
    });

    if (data.length === 0) {
        renderNotification("Nenhum dado encontrado.", NotificationType.Warning);
        return false;
    }

    if (page !== undefined)
        cached_page = page;

    if (key !== undefined)
        cached_key = key;

    if (search !== undefined)
        cached_search = search;

    hideEdit();

    // Setting the placeholder
    const placeholder = container.children[1]?.children[1] as HTMLElement;

    // Rendering the table
    const table = renderElement(
        {
            tagName: "div",
            attributes: {
                class: "flex-1 flex flex-col mt-8 overflow-hidden"
            }
        },
        renderElement(
            {
                tagName: "div",
                attributes: {
                    class: "flex gap-2 pr-3 border-b-2 border-neutral-200"
                }
            },
            renderTableHeader(),
            renderElement({
                tagName: "div",
                innerText: "Ação",
                attributes: {
                    class: `
                        text-center 
                        w-16 h-8
                        opacity-75
                        border-l-2 
                        border-neutral-200
                    `
                }
            }),
        ),
        renderElement(
            {
                tagName: "div", 
                attributes: {
                    class: "flex-1 flex h-full overflow-y-scroll"
                }
            },
            // Render the table body
            renderTableRows(),
            // Render the action column
            renderTableActions()
        ),
        renderPagination(container)
    );

    // Replacing the old table with the new one
    placeholder.replaceWith(table);

    return true;
}


/**
 * Renders the header of the table with the given metadata.
 * 
 * It renders all columns of the table as a grid, with the Field of the column
 * as the text of the element. The style of the elements is set so that they
 * are evenly distributed in the grid and have the same width as the column.
 * 
 * @returns The rendered header element.
 */
function renderTableHeader() {
    const header = renderElement(
        {
            tagName: "div",
            attributes: {
                class: `
                    text-sm text-black-pure/75
                    flex-1 grid gap-x-2 h-8 
                    *:px-2
                `,
                style: `grid-template-columns: repeat(${metadata.sizes.total}, minmax(0, 1fr));`
            }
        },
        ...metadata.rows.map((column: SQLMetadata, i: number) => {
                let innerText = column.Field;
                let title = column.Field;

                if (column.Null === "NO") {
                    innerText += " *";
                    title += " (Obrigatório)";
                }

                if (column.Key === "PRI") {
                    if (column.Extra === "auto_increment") 
                        title += " (Chave primária, Auto increment)";
                    else
                        title += " (Chave primária)";
                }

                return renderElement({ 
                    tagName: "div", 
                    innerText: innerText, 
                    attributes: { 
                        title: title,
                        class: "truncate",
                        style: `grid-column: span ${metadata.sizes.columns[i]} / span ${metadata.sizes.columns[i]};` 
                    }
                });
            }
        )
    );

    return header;
}


/**
 * Renders the rows of a table based on the given metadata and data.
 * 
 * Each row is represented as a list item, with each cell inside the row
 * rendered as a grid item. The cells are styled to be evenly distributed
 * according to the column sizes specified in the metadata.
 * 
 * @returns The rendered rows element.
 */
function renderTableRows() {
    const rows = renderElement(
        {
            tagName: "ol",
            attributes: {
                class: `
                    flex-1 flex flex-col divide-y
                    *:min-h-12 *:*:px-2 *:py-2
                    *:*:px-2
                    [&_input]:bg-neutral-100 [&_input]:rounded-md
                `
            }
        },
        ...data.map((row: Record<string, any>) => 
            renderElement(
                { 
                    tagName: "li", 
                    attributes: {
                        id: `row-id-${row[metadata.pk]}`,
                        class: "grid gap-x-2",
                        style: `grid-template-columns: repeat(${metadata.sizes.total}, minmax(0, 1fr));`
                    }
                },
                ...Object.keys(row).map((column: string, i: number) => 
                    renderElement({ 
                        tagName: "div", 
                        innerText: row[column], 
                        attributes: {
                            title: row[column],
                            class: "flex items-center truncate",
                            style: `grid-column: span ${metadata.sizes.columns[i]} / span ${metadata.sizes.columns[i]};` 
                        }
                    })
                )
            )
        )
    );

    return rows;
}


/**
 * Renders the action column for a table, which includes action buttons for each row.
 *
 * The action column is styled with a border and contains a header labeled "Ação".
 * Below the header, action buttons are rendered for each row of the table. These
 * buttons trigger additional actions when interacted with.
 *
 * @returns The rendered actions element containing the action buttons.
 */
function renderTableActions() {
    const actionButtons = renderTableActionsButtons();

    const actions = renderElement(
        {
            tagName: "div",
            attributes: {
                class: `flex flex-col items-center w-16 pl-2 ml-2`
            }
        },
        actionButtons
    );

    return actions;
}


/**
 * Renders action buttons for each row in the table.
 * 
 * Each action button, when clicked, displays a dropdown menu with options
 * such as "Edit" and "Delete". The dropdown menu is positioned relative
 * to the button and can be dismissed by clicking outside of it.
 * 
 * @returns The container element holding the action buttons.
 */
function renderTableActionsButtons() {
    const buttons = renderElement(
        {
            tagName: "div",
            attributes: {
                class: `flex flex-col mt-2`
            }
        },
        ...data.map((row: Record<string, any>) =>
            renderElement(
                {
                    tagName: "div",
                    attributes: { 
                        class: "h-12"
                    }
                },
                renderElement({
                    tagName: "button",
                    innerText: ":",
                    attributes: { 
                        key: row[metadata.rows[0]?.Field ?? 0] ?? 0,
                        type: "button",
                        class: "admin-action-button"
                    },
                })
            )
        )
    );

    /**
     * Render the action buttons on the table.
     * 
     * Each button on the list will have a dropdown menu with two options:
     * - Edit
     * - Delete
     * - View
     * 
     * The buttons will be rendered in the same order as the rows in the table.
     * 
     * When a button is clicked, a dropdown menu will appear with the two options.
     * If the user clicks outside the dropdown menu, it will be removed.
     * 
     * The function returns the action buttons container.
     */
    for (let container of buttons.children) {
        const button = container.children[0] as HTMLButtonElement;

        // creating the buttons
        const editButton = renderElement(
            {
                tagName: "button",
                attributes: {
                    type: "button"
                },
                events: {
                    "click": () => {
                        showEdit(
                            metadata, 
                            data,
                            newDropdown,
                            button.getAttribute("key") as unknown as number
                        );
                        newDropdown.classList.add("hidden");
                    }
                }
            },
            renderElement({
                tagName: "p",
                innerText: "Editar"
            }),
        );

        const deleteButton = renderElement(
            {
                tagName: "button",
                attributes: {
                    type: "button"
                },
                events: {
                    "click": () => showDelete(
                        metadata, 
                        button.getAttribute("key") as unknown as number
                    )
                }
            },
            renderElement({
                tagName: "p",
                innerText: "Excluir"
            })
        );

        const detailsButton = renderElement(
            {
                tagName: "button",
                attributes: {
                    type: "button"
                },
                events: {
                    "click": () => showDetails(
                        metadata, 
                        data, 
                        button.getAttribute("key") as unknown as number
                    )
                }
            },
            renderElement({
                tagName: "p",
                innerText: "Detalhes"
            })
        );

        // Creating the dropdown menu
        const newDropdown = renderElement(
            {
                tagName: "div",
                attributes: { 
                    class: "hidden admin-dropdown-menu"
                }
            },
            editButton,
            deleteButton,
            detailsButton
        ) as HTMLDivElement;

        document.addEventListener("click", (e: Event) => {
            const target = e.target as HTMLElement;
            let dropdown = container.children[1] as HTMLDivElement;

            if (!dropdown.contains(target) && target !== button) {
                dropdown.classList.add("hidden");
            }
        });

        container.appendChild(newDropdown);

        button.addEventListener("click", (e) => {
            let dropdown = container.querySelector(".admin-dropdown-menu") as HTMLDivElement;
            if (!dropdown) {
                console.error("Dropdown not found");
                return;
            }

            dropdown.classList.toggle("hidden");
            dropdown.setAttribute("aria-hidden", dropdown.classList.contains("hidden").toString());

            let posX = e.clientX;
            let posY = e.clientY;

            // Prevent overflow
            if (posY >= 720) {
                posY -= dropdown.offsetHeight + 25;
            }

            // For some (unholy) reason, these values are off by a few pixels
            dropdown.style.left = `${posX - 340}px`;
            dropdown.style.top = `${posY - 50}px`;
        });
    }

    return buttons;
}


/**
 * Renders the pagination buttons on the table.
 * 
 * The rendered container will have the following structure:
 * 
 * - A paragraph with the current page number.
 * - A button to go to the previous page.
 * - A button to go to the next page.
 * - A container with an input field to set the number of records per page.
 * 
 * The container will be rendered in the bottom of the table.
 * 
 * The function returns the rendered container.
 */
function renderPagination(container: HTMLElement) {
    return renderElement(
        {
            tagName: "div",
            attributes: {
                class: "flex items-center gap-4 p-2 border-t"
            }
        },
        renderElement({
            tagName: "p",
            innerText: `Página ${cached_page + 1}`,
            attributes: {
                class: "text-sm text-black-pure/75 w-20"
            }
        }),
        renderElement({
            tagName: "button",
            innerText: "Anterior",
            attributes: {
                type: "button",
                class: "hover:underline"
            },
            events: {
                click: () => {
                    if (cached_page > 0) {
                        hideEdit();
                        renderContent(container, metadata, cached_page - 1);
                    }
                }
            }
        }),
        renderElement({
            tagName: "button",
            innerText: "Próximo",
            attributes: {
                type: "button",
                class: "hover:underline"
            },
            events: {
                click: () => {
                    hideEdit();
                    renderContent(container, metadata, cached_page + 1)
                }
            }
        }),
        renderElement(
            {
                tagName: "div",
                attributes: {
                    class: "flex items-center gap-2 ml-auto"
                }
            },
            renderElement({
                tagName: "label",
                innerText: "Registros por página",
                attributes: {
                    class: "text-sm text-black-pure/75"
                } 
            }),
            renderElement({
                tagName: "input",
                attributes: {
                    type: "number",
                    min: "1",
                    max: "100",
                    value: `${localStorage.getItem("per_page") ?? 12}`,
                    class: "w-16 px-1 py-0.5 border border-primary-dark border-opacity-10 rounded-md outline-none focus:border-opacity-100"
                },
                events: {
                    input: (e) => localStorage.setItem("per_page", (e.target as HTMLInputElement).value)
                }
            })
        ),
        renderElement({
            tagName: "button",
            innerText: "Recarregar Tabela",
            attributes: {
                class: "px-2 py-0.5 border border-primary-dark border-opacity-10 rounded-md hover:bg-primary-dark hover:bg-opacity-10",
                type: "button"
            },
            events: {
                click: () => {
                    hideEdit();
                    renderContent(container, metadata, 0, "", "");
                }
            }
        })
    );
}

export default renderContent;
