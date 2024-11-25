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
    showDelete,
    showDetails,
    showEdit
} from "./crud.js";
import { NotificationType } from "../enum/render.js";


let data: TableData;
let metadata: TableMetadata;


async function renderContent(container: HTMLElement, new_metadata: TableMetadata) {
    metadata = new_metadata;

    // Fetch the data (registers) from the server
    const payload = await fetch(`get_registers/?id=${metadata.index}`);
    if (payload.status !== 200) {
        renderNotification("Não foi possível carregar os dados da tabela.", NotificationType.Warning);
        return false;
    }

    data = await payload.json().catch((_) => {
        renderNotification("Não foi possível carregar os dados da tabela.", NotificationType.Warning);
        return false;
    });

    // Setting the placeholder
    const placeholder = container.children[1]?.children[1] as HTMLElement;

    // Rendering the table
    const table = renderElement(
        {
            tagName: "div",
            attributes: {
                class: "flex flex-col gap-4 flex-1 mt-8"
            }
        },
        renderElement(
            {
                tagName: "div", 
                attributes: {
                    class: "flex flex-1"
                }
            },
            // Render the table body
            renderElement(
                {
                    tagName: "div",
                    attributes: {
                        class: "flex flex-col flex-1 h-full"
                    }
                },
                renderTableHeader(),
                renderTableRows()
            ),
            // Render the action column
            renderTableActions()
        ),
        renderElement({
            tagName: "div",
            innerText: "Page 1 of N",
            attributes: {
                class: "mt-2"
            }
        })
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
                    grid gap-x-2
                    h-8 mb-2 
                    border-b-2 border-neutral-200 
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
                    flex flex-col 
                    *:h-8 *:*:px-2 *:my-2 
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
                class: `
                    flex flex-col items-center 
                    w-16 h-full 
                    pl-2 ml-2 
                    border-l-2 
                    border-neutral-200
                `
            }
        },
        // Action header
        renderElement({
            tagName: "div",
            innerText: "Ação",
            attributes: {
                class: `
                    text-center 
                    w-full h-8 mb-2 
                    border-b-2 border-neutral-200 
                    opacity-75
                `
            }
        }),
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
                class: `flex flex-col *:my-2`
            }
        },
        ...data.map((row: Record<string, any>) =>
            renderElement(
                {
                    tagName: "div",
                    attributes: { 
                        class: "relative"
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
                            dropdown,
                            button.getAttribute("key") as unknown as number
                        );
                        dropdown.classList.add("hidden");
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
        const dropdown = renderElement(
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
            if (!container.children[1]?.contains(target) && target !== button) {
                container.children[1]?.classList.add("hidden");
            }
        });

        container.appendChild(dropdown);

        button.addEventListener("click", () => {
            container.children[1]?.classList.toggle("hidden");
        });
    }

    return buttons;
}

export default renderContent;
