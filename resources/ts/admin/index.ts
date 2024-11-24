import type {
    SQLMetadata,
    TableMetadata
} from "../types/admin.js";

import { 
    renderElement,
    renderTag
} from "../Render/index.js";  

import renderContent from "./renderContent.js";


const sideMenu = document.querySelector("#sidebar") as HTMLDivElement;
const sideMenuItens = sideMenu.querySelectorAll("div > ul > li") as NodeListOf<HTMLLIElement>;
const crudContainer = document.querySelector("#side-container") as HTMLDivElement;

let metadata: TableMetadata;
let structure: HTMLElement;

// Only shows the page when its fully loaded
window.addEventListener('load', function () {
    document.body.style.display = "block";
    loadPage(0);
}, false);


// Header Dropdown menu
const headerDropdownMenuButton = document.querySelector("#header-dropdown-menu-button") as HTMLButtonElement;
const headerDropdownMenu = document.querySelector("#header-dropdown-menu") as HTMLDivElement;

headerDropdownMenuButton.addEventListener("click", () => {
    headerDropdownMenu.classList.toggle("hidden");
});

document.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLElement;

    if (
        headerDropdownMenuButton.contains(target) || 
        headerDropdownMenu.contains(target)
    ) {
        return;
    }

    headerDropdownMenu.classList.add("hidden");
})


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
        loadPage(i);
    });
});


// =========================================================================================================================
// LOAD TABLE ==============================================================================================================
// =========================================================================================================================


let tablesMetadataCache: TableMetadata[] = [];


/**
 * Loads a table based on the given id.
 * 
 * It first checks if the metadata of the table is cached. If it is, it uses the cached metadata.
 * If not, it fetches the metadata from the server and caches it.
 * 
 * Then, it fetches the data (registers) of the table from the server.
 * 
 * After that, it makes the clicked button have the different style.
 * 
 * Finally, it renders the table and shows the CRUD container.
 * 
 * @param id - The id of the table to load.
 */
async function loadPage(id: number) {
    if(!await fetchMetadata(id))
        return;

    // Make the clicked button have the different style
    const menuItens = sideMenu.querySelectorAll("div > ul > li");
    menuItens.forEach((e, i) => {
        if (i === id)
            e.classList.add("selected-item");  // Custom CSS class
        else
            e.classList.remove("selected-item");
    });

    // Render the structure (based on the metadata)
    while (crudContainer.firstChild) {
        crudContainer.removeChild(crudContainer.firstChild);
    }
    structure = renderContainer(crudContainer);

    // Render the content (based on the data)
    if (!await renderContent(structure, metadata))
        return;

    // Show the CRUD container
    crudContainer.classList.remove("hidden");  
};


/**
 * Fetches the metadata for a table given its id.
 *
 * Checks if the metadata is cached in the tablesMetadataCache array.
 * If it is, it returns the cached metadata.
 * If it is not, it fetches it from the server and caches it.
 *
 * @param id The index of the table in the database.
 * @returns true if the metadata was fetched successfully, false otherwise.
 */
async function fetchMetadata(id: number) {
    // Check if the metadata is cached
    if (tablesMetadataCache[id]) {
        metadata = tablesMetadataCache[id];
    }
    // If is not cached, fetch metadata from the server
    else {
        let payload = await fetch(`get_metadata/?id=${id}`);

        if (payload.status !== 200) {
            alert("Não foi possível carregar a tabela.");
            return false;
        }
    
        metadata = await payload.json();
        metadata.index = id;
        metadata.sizes = calculateTableSize(metadata.rows);
        tablesMetadataCache[id] = metadata;
    }
    return true;
}


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


// =========================================================================================================================
// RENDERS =================================================================================================================
// =========================================================================================================================


function renderContainer(container: HTMLDivElement) {
    return renderElement(
        {
            container: container,
            tagName: "div",
            attributes: {
                class: "flex flex-col gap-4 w-full h-full *:w-full *:bg-white *:rounded-md *:shadow-sm"
            }
        },
        renderElement(
            {
                tagName: "header", 
                attributes: {
                    class: "flex justify-between items-center px-4 py-2"
                }
            },
            renderElement({
                tagName: "div",
                attributes: {
                    class: "text-lg"
                }},
                renderElement({
                    tagName: "span", 
                    innerText: "Tabela: ", 
                    attributes: {
                        class: "opacity-80 mr-2"
                    }
                }),
                renderElement({
                    tagName: "span", 
                    innerText: metadata.name
                })
            ),
            renderElement({
                tagName: "button", 
                innerText: "Novo Registro", 
                attributes: { 
                    type: "button", 
                    class: `
                        text-white font-bold 
                        px-8 py-2 
                        rounded-md 
                        bg-primary hover:bg-primary-dark
                    `
                },
                events: {
                    "click": () => {
                        showCreate();
                    }
                }
            })
        ),
        renderElement(
            {
                tagName: "div", 
                attributes: {
                    class: "flex-1 flex flex-col p-4 *:w-full"
                }
            },
            renderSearchBar(),
            // Placeholder for the table
            renderElement({  
                tagName: "div",
                attributes: {
                    id: "table-placeholder",
                    class: "flex-1 w-full"
                }
            })
        )
    );
}

/**
 * Renders a search bar based on the given metadata.
 * 
 * @returns The rendered search bar.
 */
function renderSearchBar() {
    // TODO: Connect with the metadata and create a function to search
    const searchBar = renderTag( 
        "div", 
        renderElement (
            {
                tagName: "form", 
                attributes: {
                    action: "",
                    class: "flex gap-4 w-full"
                }
            },
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

    return searchBar;
}


// =========================================================================================================================
// UTILS ===================================================================================================================
// =========================================================================================================================


// Functions to show to the user something

function showCreate() {
    function deleteModal() {
        baseForm.classList.remove("translate-y-0");
        baseForm.classList.add("translate-y-[100vh]");
        container.classList.remove("bg-opacity-50");
        setTimeout(() => {
            container.remove();
        }, 500);
    }

    const cancelButton = renderElement({
        tagName: "button",
        innerText: "Cancelar",
        attributes: {
            type: "button",
            class: "py-2 hover:underline",
        }
    });

    const baseForm = renderElement(
        {
            tagName: "div",
            attributes: {
                class: `
                    flex flex-col
                    h-4/5 min-w-[640px] p-4 
                    bg-white rounded-md 
                    shadow-md 
                    translate-y-[100vh] 
                    transition-transform duration-500
                `,
                style: "z-index: 101;"
            }
        },
        renderElement(
            {
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
                tagName: "h1",
                innerText: `Criar ${metadata.name}`,
                attributes: {
                    class: "text-2xl"
                }
            }),
            cancelButton
        ),
        renderElement(
            {
                tagName: "form",
                attributes: {
                    class: "flex-1 flex flex-col gap-4 p-4 overflow-auto",
                    action: "",
                    method: "POST"
                },
                events: {
                    submit: (e: Event) => postCreate(e, deleteModal)
                }
            },
            ...metadata.rows.map((column) => {
                return renderCreateSection(column);
            }),
            renderElement({
                tagName: "button",
                innerText: "Criar",
                attributes: {
                    type: "submit",
                    class: "w-3/4 mx-auto mt-6 p-3 bg-primary text-white rounded-md"
                }
            })
        )
    );

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
        baseForm
    );

    // For some reason, the setTimeout with 0 delay makes the animation smoother
    setTimeout(() => {
        baseForm.classList.add("translate-y-0");
        baseForm.classList.remove("translate-y-[100vh]");
        container.classList.add("bg-opacity-50");
    }, 0);

    // Cancel button logic
    cancelButton.addEventListener("click", deleteModal);
}


// function showDetails() {}


// function showEdit() {}


// function showDelete() {}


// Functions to post to the server

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
            alert('Dados registrados com sucesso!');
            deleteModal();
            renderContent(structure, metadata);
        } else {
            // const error = await response.json();
            // console.error('Error:', error);
            alert('Ocorreu um erro ao tentar inserir os dados.');
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        alert("Um erro inesperado ocorreu");
    }

    return false;
}


// function postEdit() {}


// function postDelete() {}


// Utils to utils

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
