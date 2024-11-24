// For some unkown reason, the import doesn't work with normal imports ("./Render" or "./Render/index.ts")
import { 
    renderElement,
    renderTag
} from "./Render/index.js";  

type SQLMetadata = {
    Field: string,
    Type: string,
    Null: string,
    Key: string,
    Default: any,
    Extra: string
}

const sideMenu = document.querySelector("#sidebar") as HTMLDivElement;
const sideMenuItens = sideMenu.querySelectorAll("div > ul > li") as NodeListOf<HTMLLIElement>;
const crudContainer = document.querySelector("#side-container") as HTMLDivElement;

let tablesMetadataCache: any[] = [];


// Only shows the page when its fully loaded
window.addEventListener('load', function () {
    document.body.classList.remove("hidden");
    loadTable(0);
}, false);


// Dropdown menu
document.querySelector("#dropdown-menu-button")
?.addEventListener("click", () => {
    document.querySelector("#dropdown-menu")?.classList.toggle("hidden");
});


// Side bar
sideMenu.querySelector("button")
?.addEventListener("click", () => {
    sideMenu.querySelector("button > svg")?.classList.toggle("rotate-180");
    sideMenu.classList.toggle("-translate-x-full");
    crudContainer.classList.toggle("w-full");
});


// Side bar buttons
sideMenuItens.forEach((e, i) => {
    e.addEventListener("click", () => {
        loadTable(i);
    });
});


function calculateTableSize(tableMetadata: SQLMetadata[]) {
    let sizes: { total: number, columns: number[] } = {
        total: 0,
        columns: []
    };

    for (let rowData of tableMetadata) {
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


// Function to the side bar load table button
async function loadTable(id: number) {
    let tableData;

    // Check if the metadata is cached
    if (tablesMetadataCache[id]) {
        tableData = tablesMetadataCache[id];
    }
    // If is not cached, fetch metadata from the server
    else {
        let payload = await fetch(`get_table?id=${id}`);

        if (payload.status !== 200) {
            alert("Não foi possível carregar a tabela.");
            return;
        }
    
        tableData = await payload.json();
        tableData.metadata.sizes = calculateTableSize(tableData.metadata);
        tablesMetadataCache[id] = tableData;
    }

    // Make the clicked button have the different style
    const menuItens = sideMenu.querySelectorAll("div > ul > li");
    menuItens.forEach((e, i) => {
        if (i === id)
            e.classList.add("selected-item");  // Custom CSS class
        else
            e.classList.remove("selected-item");
    });

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
                tagName: "span", innerText: tableData.name, 
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
            style: `grid-template-columns: repeat(${tableData.metadata.sizes.total}, minmax(0, 1fr));`
        }},
        ...tableData.metadata.map((row: SQLMetadata, i: number) => 
            renderElement({ 
                tagName: "div", 
                innerText: row.Field, 
                attributes: { 
                    title: row.Field,
                    class: "truncate",
                    style: `grid-column: span ${tableData.metadata.sizes.columns[i]} / span ${tableData.metadata.sizes.columns[i]};` 
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
        ...tableData.rows.map((row: Record<string, any>) => 
            renderElement({ 
                tagName: "li", 
                attributes: {
                    class: "grid gap-x-2",
                    style: `grid-template-columns: repeat(${tableData.metadata.sizes.total}, minmax(0, 1fr));`
                }},
                ...Object.keys(row).map((column: string, i: number) => 
                    renderElement({ 
                        tagName: "div", 
                        innerText: row[column], 
                        attributes: {
                            title: row[column],
                            class: "truncate",
                            style: `grid-column: span ${tableData.metadata.sizes.columns[i]} / span ${tableData.metadata.sizes.columns[i]};` 
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
        ...tableData.rows.map((_: Record<string, any>) =>
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

    let activeDropdown: null | HTMLDivElement = null;
    for (let container of actionButtons.children) {
        const button = container.children[0] as HTMLButtonElement;

        button.addEventListener("click", (e) => {
            e.stopPropagation();

            if (activeDropdown) {
                activeDropdown.remove();
                activeDropdown = null;
                return;
            }

            activeDropdown = renderElement({
                tagName: "div",
                innerText: "",
                attributes: { 
                    class: "z-10 absolute top-10 right-0 p-2 bg-white rounded-md shadow-sm" 
                }},
                renderElement({
                    tagName: "button",
                    innerText: "Editar",
                    attributes: { 
                        type: "button",
                        class: `
                            text-white font-bold 
                            p-2 
                            rounded-md 
                            bg-green-600 hover:bg-green-700
                        `
                    }}
                ),
                renderElement({
                    tagName: "button",
                    innerText: "Excluir",
                    attributes: { 
                        type: "button",
                        class: `
                            text-white font-bold 
                            p-2 
                            rounded-md 
                            bg-red-600 hover:bg-red-700
                        `
                    }}
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
                w-24 h-full 
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

    crudContainer.classList.remove("hidden");  // Show the CRUD container
}
