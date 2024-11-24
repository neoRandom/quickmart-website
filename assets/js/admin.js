var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
import { renderElement, renderTag } from "./Render/index.js";
const sideMenu = document.querySelector("#sidebar");
const sideMenuItens = sideMenu.querySelectorAll("div > ul > li");
const crudContainer = document.querySelector("#side-container");
let tablesMetadataCache = [];
window.addEventListener('load', function () {
    document.body.classList.remove("hidden");
    loadTable(0);
}, false);
(_a = document.querySelector("#dropdown-menu-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    var _a;
    (_a = document.querySelector("#dropdown-menu")) === null || _a === void 0 ? void 0 : _a.classList.toggle("hidden");
});
(_b = sideMenu.querySelector("button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    var _a;
    (_a = sideMenu.querySelector("button > svg")) === null || _a === void 0 ? void 0 : _a.classList.toggle("rotate-180");
    sideMenu.classList.toggle("-translate-x-full");
    crudContainer.classList.toggle("w-full");
});
sideMenuItens.forEach((e, i) => {
    e.addEventListener("click", () => {
        loadTable(i);
    });
});
function calculateTableSize(tableMetadata) {
    var _a, _b;
    let sizes = {
        total: 0,
        columns: []
    };
    for (let rowData of tableMetadata) {
        if (rowData.Type.includes("char") || rowData.Type.includes("binary")) {
            let columnSize = parseInt((_b = (_a = rowData.Type.split("(")[1]) === null || _a === void 0 ? void 0 : _a.split(")")[0]) !== null && _b !== void 0 ? _b : "1");
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
function loadTable(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let tableData;
        if (tablesMetadataCache[id]) {
            tableData = tablesMetadataCache[id];
        }
        else {
            let payload = yield fetch(`get_table?id=${id}`);
            if (payload.status !== 200) {
                alert("Não foi possível carregar a tabela.");
                return;
            }
            tableData = yield payload.json();
            tableData.metadata.sizes = calculateTableSize(tableData.metadata);
            tablesMetadataCache[id] = tableData;
        }
        const menuItens = sideMenu.querySelectorAll("div > ul > li");
        menuItens.forEach((e, i) => {
            if (i === id)
                e.classList.add("selected-item");
            else
                e.classList.remove("selected-item");
        });
        const crudBase = crudContainer.children[0];
        while (crudBase.firstChild) {
            crudBase.removeChild(crudBase.firstChild);
        }
        renderElement({
            container: crudBase, tagName: "header",
            attributes: {
                class: "flex justify-between items-center px-4 py-2"
            }
        }, renderElement({
            tagName: "div",
            attributes: {
                class: "text-lg"
            }
        }, renderElement({
            tagName: "span", innerText: "Tabela: ",
            attributes: {
                class: "opacity-80 mr-2"
            }
        }), renderElement({
            tagName: "span", innerText: tableData.name,
            attributes: {}
        })), renderElement({
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
        }));
        const searchBar = renderTag("div", renderElement({
            tagName: "form",
            attributes: {
                action: "",
                class: "flex gap-4 w-full"
            }
        }, renderElement({
            tagName: "label",
            attributes: {
                for: "search-input",
                class: "hidden"
            }
        }), renderElement({
            tagName: "input",
            attributes: {
                required: "true",
                type: "search",
                name: "search-input",
                id: "search-input",
                placeholder: "Pesquise pelo nome",
                class: `
                        flex-1 px-4 py-1 bg-neutral-100 
                        border-2 border-transparent 
                        rounded-md outline-none focus:border-secondary
                    `
            }
        }), renderElement({
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
        })));
        const tableHeader = renderElement({
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
            }
        }, ...tableData.metadata.map((row, i) => renderElement({
            tagName: "div",
            innerText: row.Field,
            attributes: {
                title: row.Field,
                class: "truncate",
                style: `grid-column: span ${tableData.metadata.sizes.columns[i]} / span ${tableData.metadata.sizes.columns[i]};`
            }
        })));
        const tableRows = renderElement({
            tagName: "ol",
            attributes: {
                class: `
                flex flex-col 
                *:h-8 *:*:px-2 *:my-2 
                *:[&>input]:bg-neutral-100 *:[&>input]:rounded-md
                *:*:px-2
            `
            }
        }, ...tableData.rows.map((row) => renderElement({
            tagName: "li",
            attributes: {
                class: "grid gap-x-2",
                style: `grid-template-columns: repeat(${tableData.metadata.sizes.total}, minmax(0, 1fr));`
            }
        }, ...Object.keys(row).map((column, i) => renderElement({
            tagName: "div",
            innerText: row[column],
            attributes: {
                title: row[column],
                class: "truncate",
                style: `grid-column: span ${tableData.metadata.sizes.columns[i]} / span ${tableData.metadata.sizes.columns[i]};`
            }
        })))));
        const actionButtons = renderElement({
            tagName: "div",
            attributes: {
                class: `flex flex-col *:my-2`
            }
        }, ...tableData.rows.map((_) => renderElement({
            tagName: "div",
            innerText: "",
            attributes: {
                class: "relative"
            }
        }, renderElement({
            tagName: "button",
            innerText: ":",
            attributes: {
                type: "button",
                class: "admin-action-button"
            },
        }))));
        let activeDropdown = null;
        for (let container of actionButtons.children) {
            const button = container.children[0];
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
                    }
                }, renderElement({
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
                    }
                }), renderElement({
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
                    }
                }));
                let deleteFunction;
                deleteFunction = (e) => {
                    const target = e.target;
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
        const tableActions = renderElement({
            tagName: "div",
            attributes: {
                class: `
                flex flex-col items-center 
                w-24 h-full 
                pl-2 ml-2 
                border-l-2 
                border-neutral-200
            `
            }
        }, renderElement({
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
        }), actionButtons);
        renderElement({
            container: crudBase,
            tagName: "div",
            attributes: {
                class: "flex-1 flex flex-col p-4 *:w-full"
            }
        }, searchBar, renderElement({
            tagName: "div",
            attributes: {
                class: "flex flex-1 mt-8"
            }
        }, renderElement({
            tagName: "div",
            attributes: {
                class: "flex flex-col flex-1 h-full"
            }
        }, tableHeader, tableRows), tableActions), renderElement({
            tagName: "div",
            innerText: "Page 1 of N",
            attributes: {
                class: "mt-2"
            }
        }));
        crudContainer.classList.remove("hidden");
    });
}
