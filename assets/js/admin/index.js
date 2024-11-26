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
import { renderElement, renderNotification, renderTag } from "../Render/index.js";
import { showCreate } from "./crud.js";
import renderContent from "./renderContent.js";
import { NotificationType } from "../enum/render.js";
const sideMenu = document.querySelector("#sidebar");
const sideMenuItens = sideMenu.querySelectorAll("div > ul > li");
const crudContainer = document.querySelector("#side-container");
let metadata;
window.addEventListener('load', function () {
    var _a;
    document.body.style.display = "block";
    if (localStorage.getItem("last_table") === null) {
        loadPage(0);
    }
    else {
        loadPage(parseInt((_a = localStorage.getItem("last_table")) !== null && _a !== void 0 ? _a : "0"));
    }
}, false);
if (localStorage.getItem("per_page") === null) {
    localStorage.setItem("per_page", "12");
}
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
const helpButton = document.querySelector("#header-dropdown-menu-help-button");
helpButton.addEventListener("click", () => {
    renderNotification("Under construction", NotificationType.Warning);
});
(_a = sideMenu.querySelector("button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    var _a;
    (_a = sideMenu.querySelector("button > svg")) === null || _a === void 0 ? void 0 : _a.classList.toggle("rotate-180");
    sideMenu.classList.toggle("-translate-x-full");
    crudContainer.classList.toggle("w-full");
});
sideMenuItens.forEach((e, i) => {
    e.addEventListener("click", () => {
        localStorage.setItem("last_table", i.toString());
        loadPage(i);
    });
});
let tablesMetadataCache = [];
let structure;
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
        if (!(yield renderContent(structure, metadata, 0)))
            return;
        crudContainer.classList.remove("hidden");
    });
}
;
function fetchMetadata(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (tablesMetadataCache[id]) {
            metadata = tablesMetadataCache[id];
        }
        else {
            let payload = yield fetch(`get_metadata/?id=${id}`);
            if (payload.status !== 200) {
                renderNotification("Não foi possível carregar a tabela.", NotificationType.Warning);
                return false;
            }
            metadata = yield payload.json();
            metadata.index = id;
            metadata.sizes = calculateTableSize(metadata.rows);
            metadata.pk = (_b = (_a = metadata.rows.find(row => row.Key === "PRI")) === null || _a === void 0 ? void 0 : _a.Field) !== null && _b !== void 0 ? _b : "";
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
function renderContainer(container) {
    return renderElement({
        container: container,
        tagName: "div",
        attributes: {
            id: "structure",
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
                showCreate(metadata);
            }
        }
    })), renderElement({
        tagName: "div",
        attributes: {
            class: "flex-1 flex flex-col p-4 overflow-hidden *:w-full"
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
            method: "GET",
            class: "flex gap-4 w-full"
        },
        events: {
            submit: (e) => {
                var _a, _b;
                e.preventDefault();
                let formData = new FormData(e.target);
                renderContent(structure, metadata, 0, (_a = formData.get("search-column")) === null || _a === void 0 ? void 0 : _a.toString(), (_b = formData.get("search-input")) === null || _b === void 0 ? void 0 : _b.toString());
                return false;
            }
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
            placeholder: "Pesquisar...",
            class: `
                        flex-1 px-4 py-1 bg-neutral-100 
                        border-2 border-transparent 
                        rounded-md outline-none focus:border-secondary
                    `
        }
    }), renderElement({
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
    }, ...metadata.rows.map((column) => {
        return renderElement({
            tagName: "option",
            innerText: column.Field,
            attributes: {
                value: column.Field
            }
        });
    })), renderElement({
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
