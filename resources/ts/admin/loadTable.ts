import { 
    renderElement,
    renderTag
} from "../Render/index.js";  

import type {
    SQLMetadata,
    TableMetadata,
    TableData
} from "../types/admin.js";

const sideMenu = document.querySelector("#sidebar") as HTMLDivElement;
const crudContainer = document.querySelector("#side-container") as HTMLDivElement;

let tablesMetadataCache: TableMetadata[] = [];


/**
 * Calculates the total size of a table based on its metadata.
 * The size of a column is based on the type of the column. If the type is char or binary,
 * the size is the length of the column divided by 12. Otherwise, the size is 1.
 * @param metadataSQL The metadata of the table to calculate the size of.
 * @returns The total size of the table.
 */
function calculateTableSize(metadataSQL: SQLMetadata[]) {
    let sizes: { total: number, columns: number[] } = {
        total: 0,
        columns: []
    };

    for (let rowData of metadataSQL) {
        if (rowData.Type.includes("char") || rowData.Type.includes("binary")) {
            let columnSize = parseInt(rowData.Type.split("(")[1]?.split(")")[0] ?? "1");
            let gridCols = Math.floor(columnSize / 12);
            sizes.columns.push(gridCols);
            sizes.total += gridCols;
        }
        else {
            sizes.columns.push(1);
            sizes.total += 1;
        }
    }

    return sizes;
}


function renderTable(metadata: TableMetadata, data: TableData) {
    // Removing all child Nodes from tableBase element
    const crudBase = crudContainer.children[0] as HTMLDivElement;

    while (crudBase.firstChild) {
        crudBase.removeChild(crudBase.firstChild);
    }

    // Render the header
    renderElement({ 
        container: crudBase,  tagName: "header", 
        attributes: {
            class: "flex justify-between items-center px-4 py-2"
        }},
        renderElement({
            tagName: "div",
            attributes: {
                class: "text-lg"
            }},
            renderElement({
                tagName: "span", innerText: "Tabela: ", 
                attributes: {
                    class: "opacity-80 mr-2"
                }
            }),
            renderElement({
                tagName: "span", innerText: metadata.name, 
                attributes: {}
            })
        ),
        renderElement({
            tagName: "button", innerText: "Novo Registro", 
            attributes: { 
                type: "button", 
                class: `
                    text-white font-bold 
                    px-8 py-2 
                    rounded-md 
                    bg-primary hover:bg-primary-dark
                `
            }
        })
    )

    // Render the body
    const searchBar = 
    renderTag( 
        "div", 
        renderElement ({
            tagName: "form", 
            attributes: {
                action: "",
                class: "flex gap-4 w-full"
            }},
            renderElement({
                tagName: "label", 
                attributes: {
                    for: "search-input", 
                    class: "hidden"
                }
            }),
            renderElement({
                tagName: "input", 
                attributes: {
                    required: "true",
                    type: "search", 
                    name: "search-input",
                    id: "search-input", 
                    placeholder: "Pesquise pelo nome" , 
                    class: `
                        flex-1 px-4 py-1 bg-neutral-100 
                        border-2 border-transparent 
                        rounded-md outline-none focus:border-secondary
                    `
                }
            }),
            renderElement({
                tagName: "button", 
                innerText: "Pesquisar",
                attributes: {
                    type: "submit", 
                    class: `
                        text-white font-bold 
                        w-24 py-1 
                        rounded-md 
                        bg-primary hover:bg-primary-dark
                    `
                }
            })
        )
    );

    const tableHeader = 
    renderElement({
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
        }},
        ...metadata.rows.map((column: SQLMetadata, i: number) => 
            renderElement({ 
                tagName: "div", 
                innerText: column.Field, 
                attributes: { 
                    title: column.Field,
                    class: "truncate",
                    style: `grid-column: span ${metadata.sizes.columns[i]} / span ${metadata.sizes.columns[i]};` 
                }
            })
        )
    );

    const tableRows = 
    renderElement({
        tagName: "ol",
        attributes: {
            class: `
                flex flex-col 
                *:h-8 *:*:px-2 *:my-2 
                *:[&>input]:bg-neutral-100 *:[&>input]:rounded-md
                *:*:px-2
            `
        }},
        ...data.map((row: Record<string, any>) => 
            renderElement({ 
                tagName: "li", 
                attributes: {
                    class: "grid gap-x-2",
                    style: `grid-template-columns: repeat(${metadata.sizes.total}, minmax(0, 1fr));`
                }},
                ...Object.keys(row).map((column: string, i: number) => 
                    renderElement({ 
                        tagName: "div", 
                        innerText: row[column], 
                        attributes: {
                            title: row[column],
                            class: "truncate",
                            style: `grid-column: span ${metadata.sizes.columns[i]} / span ${metadata.sizes.columns[i]};` 
                        }
                    })
                )
            )
        )
    )

    const actionButtons = 
    renderElement({
        tagName: "div",
        attributes: {
            class: `flex flex-col *:my-2`
        }},
        ...data.map((_: Record<string, any>) =>
            renderElement({
                tagName: "div",
                innerText: "",
                attributes: { 
                    class: "relative"
                }},
                renderElement({
                    tagName: "button",
                    innerText: ":",
                    attributes: { 
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
    let activeDropdown: null | HTMLDivElement = null;
    for (let container of actionButtons.children) {
        const button = container.children[0] as HTMLButtonElement;

        button.addEventListener("click", (e) => {
            e.stopPropagation();

            if (activeDropdown) {
                if (activeDropdown.previousElementSibling === button) {
                    activeDropdown.remove();
                    activeDropdown = null;
                    return;
                }
                else {
                    activeDropdown.remove();
                    activeDropdown = null;
                }
            }

            activeDropdown = renderElement({
                tagName: "div",
                innerText: "",
                attributes: { 
                    class: `
                        z-10 absolute top-10 right-0 
                        flex flex-col gap-1
                        p-2 bg-white 
                        border border-black-pure border-opacity-10
                        rounded-md shadow-md

                        *:flex *:items-center *:gap-4
                        *:px-4 *:py-2
                        *:rounded-md *:transition-colors
                        hover:*:bg-neutral-200 
                        active:*:bg-primary active:*:text-white
                    `
                }},
                renderElement({
                    tagName: "button",
                    attributes: {
                        type: "button"
                    }},
                    renderElement({
                        tagName: "p",
                        innerText: "Editar",
                        attributes: {}
                    }),
                ),
                renderElement({
                    tagName: "button",
                    attributes: {
                        type: "button"
                    }},
                    renderElement({
                        tagName: "p",
                        innerText: "Excluir",
                        attributes: {}
                    })
                )
            ) as HTMLDivElement;

            let deleteFunction: (e: Event) => void;
            
            deleteFunction = (e: Event) => {
                const target = e.target as HTMLElement;
                if (activeDropdown && !activeDropdown.contains(target)) {
                    activeDropdown.remove();
                    activeDropdown = null;
                    document.removeEventListener("click", deleteFunction);
                }
            };

            document.addEventListener("click", deleteFunction);

            container.appendChild(activeDropdown);
        });
    }
        

    const tableActions = 
    renderElement({
        tagName: "div",
        attributes: {
            class: `
                flex flex-col items-center 
                w-16 h-full 
                pl-2 ml-2 
                border-l-2 
                border-neutral-200
            `
        }},
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
        // Action buttons
        actionButtons
    );


    renderElement({
        container: crudBase, 
        tagName: "div", 
        attributes: {
            class: "flex-1 flex flex-col p-4 *:w-full"
        }},
        searchBar,

        // Render the table
        renderElement({
            tagName: "div", 
            attributes: {
                class: "flex flex-1 mt-8"
            }},
            // Render the table body
            renderElement({
                tagName: "div",
                attributes: {
                    class: "flex flex-col flex-1 h-full"
                }},
                tableHeader,
                tableRows
            ),
            // Render the action column
            tableActions
        ),
        // Footer to move through pages
        renderElement({
            tagName: "div",
            innerText: "Page 1 of N",
            attributes: {
                class: "mt-2"
            }
        })
    );
}


// Function to the side bar load table button
async function loadTable(id: number) {
    let metadata: TableMetadata;
    let data: TableData;

    // Check if the metadata is cached
    if (tablesMetadataCache[id]) {
        metadata = tablesMetadataCache[id];
    }
    // If is not cached, fetch metadata from the server
    else {
        let payload = await fetch(`get_metadata?id=${id}`);

        if (payload.status !== 200) {
            alert("Não foi possível carregar a tabela.");
            return;
        }
    
        metadata = await payload.json();
        metadata.sizes = calculateTableSize(metadata.rows);
        tablesMetadataCache[id] = metadata;
    }

    // Fetch the data (registers) from the server
    const payload = await fetch(`get_registers?id=${id}`);
    if (payload.status !== 200) {
        alert("Não foi possível carregar os dados da tabela.");
        return;
    }

    data = await payload.json();

    // Make the clicked button have the different style
    const menuItens = sideMenu.querySelectorAll("div > ul > li");
    menuItens.forEach((e, i) => {
        if (i === id)
            e.classList.add("selected-item");  // Custom CSS class
        else
            e.classList.remove("selected-item");
    });

    // Render the HTML
    renderTable(metadata, data);

    // Show the CRUD container
    crudContainer.classList.remove("hidden");  
};

export default loadTable;
