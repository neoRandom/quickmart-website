var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { renderElement, renderTag } from "../Render/index.js";
import renderContent from "./renderContent.js";
const sideMenu = document.querySelector("#sidebar");
const sideMenuItens = sideMenu.querySelectorAll("div > ul > li");
const crudContainer = document.querySelector("#side-container");
let metadata;
let structure;
window.addEventListener('load', function () {
    document.body.style.display = "block";
    loadPage(0);
}, false);
const headerDropdownMenuButton = document.querySelector("#header-dropdown-menu-button");
const headerDropdownMenu = document.querySelector("#header-dropdown-menu");
headerDropdownMenuButton.addEventListener("click", () => {
    headerDropdownMenu.classList.toggle("hidden");
});
document.addEventListener("click", (e) => {
    const target = e.target;
    if (headerDropdownMenuButton.contains(target) ||
        headerDropdownMenu.contains(target)) {
        return;
    }
    headerDropdownMenu.classList.add("hidden");
});
(_a = sideMenu.querySelector("button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    var _a;
    (_a = sideMenu.querySelector("button > svg")) === null || _a === void 0 ? void 0 : _a.classList.toggle("rotate-180");
    sideMenu.classList.toggle("-translate-x-full");
    crudContainer.classList.toggle("w-full");
});
sideMenuItens.forEach((e, i) => {
    e.addEventListener("click", () => {
        loadPage(i);
    });
});
let tablesMetadataCache = [];
function loadPage(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield fetchMetadata(id)))
            return;
        const menuItens = sideMenu.querySelectorAll("div > ul > li");
        menuItens.forEach((e, i) => {
            if (i === id)
                e.classList.add("selected-item");
            else
                e.classList.remove("selected-item");
        });
        while (crudContainer.firstChild) {
            crudContainer.removeChild(crudContainer.firstChild);
        }
        structure = renderContainer(crudContainer);
        if (!(yield renderContent(structure, metadata)))
            return;
        crudContainer.classList.remove("hidden");
    });
}
;
function fetchMetadata(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (tablesMetadataCache[id]) {
            metadata = tablesMetadataCache[id];
        }
        else {
            let payload = yield fetch(`get_metadata/?id=${id}`);
            if (payload.status !== 200) {
                alert("Não foi possível carregar a tabela.");
                return false;
            }
            metadata = yield payload.json();
            metadata.index = id;
            metadata.sizes = calculateTableSize(metadata.rows);
            tablesMetadataCache[id] = metadata;
        }
        return true;
    });
}
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
function renderContainer(container) {
    return renderElement({
        container: container,
        tagName: "div",
        attributes: {
            class: "flex flex-col gap-4 w-full h-full *:w-full *:bg-white *:rounded-md *:shadow-sm"
        }
    }, renderElement({
        tagName: "header",
        attributes: {
            class: "flex justify-between items-center px-4 py-2"
        }
    }, renderElement({
        tagName: "div",
        attributes: {
            class: "text-lg"
        }
    }, renderElement({
        tagName: "span",
        innerText: "Tabela: ",
        attributes: {
            class: "opacity-80 mr-2"
        }
    }), renderElement({
        tagName: "span",
        innerText: metadata.name
    })), renderElement({
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
    })), renderElement({
        tagName: "div",
        attributes: {
            class: "flex-1 flex flex-col p-4 *:w-full"
        }
    }, renderSearchBar(), renderElement({
        tagName: "div",
        attributes: {
            id: "table-placeholder",
            class: "flex-1 w-full"
        }
    })));
}
function renderSearchBar() {
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
    return searchBar;
}
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
    const baseForm = renderElement({
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
    }, renderElement({
        tagName: "div",
        attributes: {
            class: `
                        flex items-center justify-between 
                        w-full h-fit px-4 py-2
                        border-b-2 border-primary-dark border-opacity-50
                    `
        }
    }, renderElement({
        tagName: "h1",
        innerText: `Criar ${metadata.name}`,
        attributes: {
            class: "text-2xl"
        }
    }), cancelButton), renderElement({
        tagName: "form",
        attributes: {
            class: "flex-1 flex flex-col gap-4 p-4 overflow-auto",
            action: "",
            method: "POST"
        },
        events: {
            submit: (e) => postCreate(e, deleteModal)
        }
    }, ...metadata.rows.map((column) => {
        return renderCreateSection(column);
    }), renderElement({
        tagName: "button",
        innerText: "Criar",
        attributes: {
            type: "submit",
            class: "w-3/4 mx-auto mt-6 p-3 bg-primary text-white rounded-md"
        }
    })));
    const container = renderElement({
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
    }, baseForm);
    setTimeout(() => {
        baseForm.classList.add("translate-y-0");
        baseForm.classList.remove("translate-y-[100vh]");
        container.classList.add("bg-opacity-50");
    }, 0);
    cancelButton.addEventListener("click", deleteModal);
}
function postCreate(e, deleteModal) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("id", metadata.index.toString());
        const data = {};
        formData.forEach((value, key) => {
            if (typeof value === 'string') {
                data[key] = value;
            }
        });
        try {
            const response = yield fetch('insert/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                alert('Dados registrados com sucesso!');
                deleteModal();
                renderContent(structure, metadata);
            }
            else {
                alert('Ocorreu um erro ao tentar inserir os dados.');
            }
        }
        catch (error) {
            console.error('Unexpected error:', error);
            alert("Um erro inesperado ocorreu");
        }
        return false;
    });
}
function renderCreateSection(column) {
    var _a;
    const label = renderElement({
        tagName: "label",
        innerText: column.Field,
        attributes: {
            for: column.Field,
            class: "text-sm indent-2 opacity-50"
        }
    });
    if (column.Null === "NO") {
        label.innerText += ' *';
    }
    if (column.Key === "PRI") {
        label.innerText += ' (Chave primária)';
    }
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
    });
    if (column.Null === "NO") {
        input.setAttribute("required", "true");
    }
    if (column.Default !== null) {
        input.setAttribute("value", column.Default);
    }
    if (column.Extra === "auto_increment") {
        input.setAttribute("disabled", "true");
        input.setAttribute("title", "Valor automático não pode ser alterado");
        input.classList.add("cursor-not-allowed");
        input.classList.add("bg-neutral-200");
    }
    let type = column.Type.split("(")[0];
    switch (type) {
        case "tinyint":
        case "smallint":
        case "mediumint":
        case "int":
        case "integer":
        case "bigint":
            input.setAttribute("type", "number");
            if (column.Type.includes("unsigned")) {
                input.setAttribute("min", "0");
            }
            break;
        case "decimal":
        case "numeric":
        case "float":
        case "double":
            input.setAttribute("type", "number");
            input.setAttribute("step", "0.01");
            break;
        case "char":
        case "varchar":
        case "tinytext":
        case "text":
        case "mediumtext":
        case "longtext":
            input.setAttribute("type", "text");
            let maxSize = (_a = column.Type.split("(")[1]) === null || _a === void 0 ? void 0 : _a.split(")")[0];
            if (maxSize)
                input.setAttribute("maxlength", maxSize);
            label.innerText += ' (Tamanho máximo: ' + maxSize + ')';
            break;
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
        default:
            input.setAttribute("type", "text");
            break;
    }
    const section = renderElement({
        tagName: "div",
        attributes: {
            class: "flex flex-col gap-1"
        }
    }, label, input);
    return section;
}
