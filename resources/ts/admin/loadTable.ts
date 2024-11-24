import type {
    SQLMetadata,
    TableMetadata,
    TableData
} from "../types/admin.js";

import {
    renderUpperHeader,
    renderBody
} from "./renders.js";


const sideMenu = document.querySelector("#sidebar") as HTMLDivElement;
const crudContainer = document.querySelector("#side-container") as HTMLDivElement;

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


/**
 * Renders a table based on the given metadata and data.
 * 
 * It removes all content from the given container and adds the rendered table to it.
 * 
 * @param metadata The metadata of the table to render.
 * @param data The data of the table, used to populate the table rows.
 */
function renderTable(metadata: TableMetadata, data: TableData) {
    // Removing all child Nodes from tableBase element
    const crudBase = crudContainer.children[0] as HTMLDivElement;

    while (crudBase.firstChild) {
        crudBase.removeChild(crudBase.firstChild);
    }

    // Render the header
    renderUpperHeader(metadata, crudBase);

    // Render the body
    renderBody(metadata, data, crudBase);
}


export default loadTable;
