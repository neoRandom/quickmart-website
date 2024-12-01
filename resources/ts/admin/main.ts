import type {
    TableMetadata
} from "../types/admin.js";

import { 
    renderElement,
    renderNotification,
    renderTag
} from "../Render/index.js";  

import { 
    showCreate,
    showCreateUser
} from "./crud.js";

import { 
    generateDevModal,
    generateSupportModal
} from "./headerModals.js";

import renderContent from "./renderContent.js";

import { NotificationType } from "../enum/render.js";
import { fetchMetadata } from "../data/admin/database.js";


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
    localStorage.setItem("per_page", "12");
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

const devButton = document.querySelector("#header-dropdown-menu-dev-button") as HTMLButtonElement;
devButton.addEventListener("click", generateDevModal);

const supportButton = document.querySelector("#header-dropdown-menu-support-button") as HTMLButtonElement;
supportButton.addEventListener("click", generateSupportModal);

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

let structure: HTMLDivElement;


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
    if(!await fetchMetadataWrapper(id))
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
    structure = renderContainer(crudContainer) as HTMLDivElement;

    // Render the content (based on the data)
    if (!await renderContent(structure, metadata, 0, "", ""))
        return;

    // Show the CRUD container
    crudContainer.classList.remove("hidden");  
};



/**
 * Fetches metadata for a given ID, either from cache or from the server.
 * 
 * @param id - The ID of the metadata to fetch.
 * @returns A promise that resolves to `true` if the metadata was successfully fetched or retrieved from cache, `false` otherwise.
 * 
 * @remarks
 * - If the metadata is cached, it retrieves it from the cache.
 * - If the metadata is not cached, it fetches it from the server.
 * - If the fetch operation fails, it renders a notification with a warning message.
 * 
 * @example
 * ```typescript
 * const success = await fetchMetadataWrapper(123);
 * if (success) {
 *     console.log("Metadata fetched successfully.");
 * } else {
 *     console.log("Failed to fetch metadata.");
 * }
 * ```
 */
async function fetchMetadataWrapper(id: number) {
    // Check if the metadata is cached
    if (tablesMetadataCache[id]) {
        metadata = tablesMetadataCache[id];
        return true;
    }
    // If is not cached, fetch metadata from the server
    let temp = await fetchMetadata(id);

    if (temp === null){
        renderNotification("Não foi possível carregar a tabela.", NotificationType.Warning);
        return false;
    }

    metadata = temp;

    tablesMetadataCache[id] = metadata;
    
    return true;
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
                    "click": (metadata.name === "credenciais") ? (() => {
                        showCreateUser(metadata);
                    }) : (() => {
                        showCreate(metadata);
                    })
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
                    method: "GET",
                    class: "flex gap-4 w-full"
                },
                events: {
                    submit: (e) => {
                        e.preventDefault();

                        let formData = new FormData(e.target as HTMLFormElement);

                        renderContent(
                            structure, 
                            metadata, 
                            0, 
                            formData.get("search-column")?.toString(), 
                            formData.get("search-input")?.toString()
                        );

                        return false;
                    }
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
                    placeholder: "Pesquisar...", 
                    class: `
                        flex-1 px-4 py-1 bg-neutral-100 
                        border-2 border-transparent 
                        rounded-md outline-none focus:border-secondary
                    `
                }
            }),
            // Combobox to select which column to search
            renderElement(
                {
                    tagName: "select", 
                    attributes: {
                        name: "search-column", 
                        id: "search-column", 
                        class: `
                            px-4 py-1 bg-neutral-100 
                            border-2 border-transparent 
                            rounded-md outline-none focus:border-secondary
                        `
                    }
                },
                ...metadata.rows.map((column) => {
                    return renderElement({
                        tagName: "option", 
                        innerText: column.Field,
                        attributes: {
                            value: column.Field
                        }
                    });
                })
            ),
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
