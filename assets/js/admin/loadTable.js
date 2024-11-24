var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderElement, renderTag } from "../Render/index.js";
const sideMenu = document.querySelector("#sidebar");
const crudContainer = document.querySelector("#side-container");
let tablesMetadataCache = [];
function calculateTableSize(metadataSQL) {
    var _a, _b;
    let sizes = {
        total: 0,
        columns: []
    };
    for (let rowData of metadataSQL) {
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
function renderTable(metadata, data) {
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
        tagName: "span", innerText: metadata.name,
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
            style: `grid-template-columns: repeat(${metadata.sizes.total}, minmax(0, 1fr));`
        }
    }, ...metadata.rows.map((column, i) => renderElement({
        tagName: "div",
        innerText: column.Field,
        attributes: {
            title: column.Field,
            class: "truncate",
            style: `grid-column: span ${metadata.sizes.columns[i]} / span ${metadata.sizes.columns[i]};`
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
    }, ...data.map((row) => renderElement({
        tagName: "li",
        attributes: {
            class: "grid gap-x-2",
            style: `grid-template-columns: repeat(${metadata.sizes.total}, minmax(0, 1fr));`
        }
    }, ...Object.keys(row).map((column, i) => renderElement({
        tagName: "div",
        innerText: row[column],
        attributes: {
            title: row[column],
            class: "truncate",
            style: `grid-column: span ${metadata.sizes.columns[i]} / span ${metadata.sizes.columns[i]};`
        }
    })))));
    const actionButtons = renderElement({
        tagName: "div",
        attributes: {
            class: `flex flex-col *:my-2`
        }
    }, ...data.map((_) => renderElement({
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
                }
            }, renderElement({
                tagName: "button",
                attributes: {
                    type: "button"
                }
            }, renderElement({
                tagName: "p",
                innerText: "Editar",
                attributes: {}
            })), renderElement({
                tagName: "button",
                attributes: {
                    type: "button"
                }
            }, renderElement({
                tagName: "p",
                innerText: "Excluir",
                attributes: {}
            })));
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
                w-16 h-full 
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
}
function loadTable(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let metadata;
        let data;
        if (tablesMetadataCache[id]) {
            metadata = tablesMetadataCache[id];
        }
        else {
            let payload = yield fetch(`get_metadata?id=${id}`);
            if (payload.status !== 200) {
                alert("Não foi possível carregar a tabela.");
                return;
            }
            metadata = yield payload.json();
            metadata.sizes = calculateTableSize(metadata.rows);
            tablesMetadataCache[id] = metadata;
        }
        const payload = yield fetch(`get_registers?id=${id}`);
        if (payload.status !== 200) {
            alert("Não foi possível carregar os dados da tabela.");
            return;
        }
        data = yield payload.json();
        const menuItens = sideMenu.querySelectorAll("div > ul > li");
        menuItens.forEach((e, i) => {
            if (i === id)
                e.classList.add("selected-item");
            else
                e.classList.remove("selected-item");
        });
        renderTable(metadata, data);
        crudContainer.classList.remove("hidden");
    });
}
;
export default loadTable;
