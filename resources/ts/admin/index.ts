import type {
    SQLMetadata,
    TableMetadata
} from "../types/admin.js";

import { 
    renderElement,
    renderNotification,
    renderTag
} from "../Render/index.js";  

import { 
    hideEdit,
    showCreate
} from "./crud.js";

import renderContent from "./renderContent.js";
import { NotificationType } from "../enum/render.js";


const sideMenu = document.querySelector("#sidebar") as HTMLDivElement;
const sideMenuItens = sideMenu.querySelectorAll("div > ul > li") as NodeListOf<HTMLLIElement>;
const crudContainer = document.querySelector("#side-container") as HTMLDivElement;

let metadata: TableMetadata;

// Only shows the page when its fully loaded
window.addEventListener('load', function () {
    document.body.style.display = "block";

    if (localStorage.getItem("last_table") === null) {
        loadPage(0);
    }
    else {
        loadPage(parseInt(localStorage.getItem("last_table") ?? "0"));
    }
}, false);


// Setting the per page value
if (localStorage.getItem("per_page") === null) {
    localStorage.setItem("per_page", "15");
}

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

const helpButton = document.querySelector("#header-dropdown-menu-help-button") as HTMLButtonElement;
helpButton.addEventListener("click", () => {
    renderNotification("Under construction", NotificationType.Warning);
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
        localStorage.setItem("last_table", i.toString());
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

    hideEdit();

    // Render the structure (based on the metadata)
    while (crudContainer.firstChild) {
        crudContainer.removeChild(crudContainer.firstChild);
    }
    const structure = renderContainer(crudContainer);

    // Render the content (based on the data)
    if (!await renderContent(structure, metadata, 0))
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
            renderNotification("Não foi possível carregar a tabela.", NotificationType.Warning);
            return false;
        }
    
        metadata = await payload.json();
        metadata.index = id;
        metadata.sizes = calculateTableSize(metadata.rows);
        metadata.pk = metadata.rows.find(row => row.Key === "PRI")?.Field ?? "";
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
            let gridCols = Math.min(Math.ceil(columnSize / 12), 4);
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


/**
 * Renders the structure of the CRUD container.
 * 
 * This function renders the header with the table name and a button to create a new register.
 * 
 * It also renders the container for the table, which is a flexbox that takes up the remaining space.
 * 
 * The innerHTML of the container is set to an empty string.
 * 
 * @param container The container element to render the structure in.
 * @returns The rendered structure element.
 */
function renderContainer(container: HTMLDivElement) {
    return renderElement(
        {
            container: container,
            tagName: "div",
            attributes: {
                id: "structure",
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
                        showCreate(metadata);
                    }
                }
            })
        ),
        renderElement(
            {
                tagName: "div", 
                attributes: {
                    class: "flex-1 flex flex-col p-4 overflow-hidden *:w-full"
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
