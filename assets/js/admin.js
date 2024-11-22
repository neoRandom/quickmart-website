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
import { renderElement, renderChild } from "Render/index.js";
const sideMenu = document.querySelector("#sidebar");
const sideMenuItens = sideMenu.querySelectorAll("div > ul > li");
const crudContainer = document.querySelector("#side-container");
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
function loadTable(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const menuItens = sideMenu.querySelectorAll("div > ul > li");
        menuItens.forEach((e, i) => {
            if (i === id)
                e.classList.add("selected-item");
            else
                e.classList.remove("selected-item");
        });
        const tableMetadata = yield fetch(`get_table?id=${id}`)
            .then(response => response.json())
            .catch(error => {
            console.error("Error:", error);
        });
        console.log(tableMetadata);
        const crudBase = crudContainer.children[0];
        while (crudBase.firstChild) {
            crudBase.removeChild(crudBase.firstChild);
        }
        renderElement({
            container: crudBase,
            tagName: "header",
            innerText: "",
            attributes: {
                class: "flex justify-between items-center px-4 py-2"
            }
        }, renderChild({
            tagName: "div",
            innerText: "",
            attributes: {
                class: "text-lg"
            }
        }, renderChild({
            tagName: "span",
            innerText: "Tabela: ",
            attributes: {
                class: "opacity-80 mr-2"
            }
        }), renderChild({
            tagName: "span",
            innerText: tableMetadata.tableName,
            attributes: {}
        })), renderChild({
            tagName: "button",
            innerText: "Novo Registro",
            attributes: {
                type: "button",
                class: "text-white font-bold px-8 py-2 rounded-md bg-primary hover:bg-primary-dark"
            }
        }));
        crudContainer.classList.remove("hidden");
    });
}
