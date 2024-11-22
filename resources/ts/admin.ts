// For some unkown reason, the import doesn't work with normal imports ("./Render" or "./Render/index.ts")
import { 
    renderElement, 
    renderChild 
} from "./Render/index.js";  


const sideMenu = document.querySelector("#sidebar") as HTMLDivElement;
const sideMenuItens = sideMenu.querySelectorAll("div > ul > li") as NodeListOf<HTMLLIElement>;
const crudContainer = document.querySelector("#side-container") as HTMLDivElement;


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


// Function to the side bar load table button
async function loadTable(id: number) {
    // Make the clicked button have the different style
    const menuItens = sideMenu.querySelectorAll("div > ul > li");
    menuItens.forEach((e, i) => {
        if (i === id)
            e.classList.add("selected-item");  // Custom CSS class
        else
            e.classList.remove("selected-item");
    });

    // Fetch metadata from the server
    let payload = await fetch(`get_table?id=${id}`);
    let tableMetadata = await payload.json();

    // Removing all child Nodes from tableBase element
    const crudBase = crudContainer.children[0] as HTMLDivElement;

    while (crudBase.firstChild) {
        crudBase.removeChild(crudBase.firstChild);
    }

    // Render the header
    renderElement(
        {
            container: crudBase, 
            tagName: "header", 
            innerText: "", 
            attributes: {
                class: "flex justify-between items-center px-4 py-2"
            }
        },
        renderChild(
            {
                tagName: "div", 
                innerText: "", 
                attributes: {
                    class: "text-lg"
                }
            },
            renderChild(
                {
                    tagName: "span", 
                    innerText: "Tabela: ", 
                    attributes: {
                        class: "opacity-80 mr-2"
                    }
                }
            ),
            renderChild(
                {
                    tagName: "span", 
                    innerText: tableMetadata.tableName, 
                    attributes: {}
                }
            )
        ),
        renderChild(
            {
                tagName: "button", 
                innerText: "Novo Registro", 
                attributes: { 
                    type: "button", 
                    class: "text-white font-bold px-8 py-2 rounded-md bg-primary hover:bg-primary-dark" 
                }
            }
        )
    )

    crudContainer.classList.remove("hidden");  // Show the CRUD container
}
