var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderElement, renderNotification } from "../Render/index.js";
import { showDelete, showDetails, showEdit } from "./crud.js";
import { NotificationType } from "../enum/render.js";
let data;
let metadata;
let cached_page = 0;
function renderContent(container, new_metadata, page, search) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        metadata = new_metadata;
        let url = `get_registers/?id=${metadata.index}`;
        let per_page = undefined;
        if (localStorage.getItem("per_page") !== null)
            per_page = parseInt((_a = localStorage.getItem("per_page")) !== null && _a !== void 0 ? _a : "12");
        if (search !== undefined)
            url += `&value=${search}`;
        if (page !== undefined) {
            url += `&limit=${per_page}`;
            if (per_page !== undefined) {
                url += `&offset=${page * per_page}`;
            }
        }
        const payload = yield fetch(url);
        if (payload.status !== 200) {
            renderNotification("Não foi possível carregar os dados da tabela.", NotificationType.Warning);
            return false;
        }
        data = yield payload.json().catch((_) => {
            renderNotification("Não foi possível carregar os dados da tabela.", NotificationType.Warning);
            return false;
        });
        if (data.length === 0) {
            renderNotification("Nenhum dado encontrado.", NotificationType.Warning);
            return false;
        }
        if (page !== undefined)
            cached_page = page;
        const placeholder = (_b = container.children[1]) === null || _b === void 0 ? void 0 : _b.children[1];
        const table = renderElement({
            tagName: "div",
            attributes: {
                class: "flex-1 flex flex-col mt-8 overflow-hidden"
            }
        }, renderElement({
            tagName: "div",
            attributes: {
                class: "flex gap-2 pr-3 border-b-2 border-neutral-200"
            }
        }, renderTableHeader(), renderElement({
            tagName: "div",
            innerText: "Ação",
            attributes: {
                class: `
                        text-center 
                        w-16 h-8
                        opacity-75
                        border-l-2 
                        border-neutral-200
                    `
            }
        })), renderElement({
            tagName: "div",
            attributes: {
                class: "flex-1 flex h-full overflow-y-scroll"
            }
        }, renderTableRows(), renderTableActions()), renderPagination(container));
        placeholder.replaceWith(table);
        return true;
    });
}
function renderTableHeader() {
    const header = renderElement({
        tagName: "div",
        attributes: {
            class: `
                    text-sm text-black-pure/75
                    flex-1 grid gap-x-2 h-8 
                    *:px-2
                `,
            style: `grid-template-columns: repeat(${metadata.sizes.total}, minmax(0, 1fr));`
        }
    }, ...metadata.rows.map((column, i) => {
        let innerText = column.Field;
        let title = column.Field;
        if (column.Null === "NO") {
            innerText += " *";
            title += " (Obrigatório)";
        }
        if (column.Key === "PRI") {
            if (column.Extra === "auto_increment")
                title += " (Chave primária, Auto increment)";
            else
                title += " (Chave primária)";
        }
        return renderElement({
            tagName: "div",
            innerText: innerText,
            attributes: {
                title: title,
                class: "truncate",
                style: `grid-column: span ${metadata.sizes.columns[i]} / span ${metadata.sizes.columns[i]};`
            }
        });
    }));
    return header;
}
function renderTableRows() {
    const rows = renderElement({
        tagName: "ol",
        attributes: {
            class: `
                    flex-1 flex flex-col divide-y
                    *:min-h-12 *:*:px-2 *:py-2
                    *:*:px-2
                    [&_input]:bg-neutral-100 [&_input]:rounded-md
                `
        }
    }, ...data.map((row) => renderElement({
        tagName: "li",
        attributes: {
            id: `row-id-${row[metadata.pk]}`,
            class: "grid gap-x-2",
            style: `grid-template-columns: repeat(${metadata.sizes.total}, minmax(0, 1fr));`
        }
    }, ...Object.keys(row).map((column, i) => renderElement({
        tagName: "div",
        innerText: row[column],
        attributes: {
            title: row[column],
            class: "flex items-center truncate",
            style: `grid-column: span ${metadata.sizes.columns[i]} / span ${metadata.sizes.columns[i]};`
        }
    })))));
    return rows;
}
function renderTableActions() {
    const actionButtons = renderTableActionsButtons();
    const actions = renderElement({
        tagName: "div",
        attributes: {
            class: `flex flex-col items-center w-16 pl-2 ml-2`
        }
    }, actionButtons);
    return actions;
}
function renderTableActionsButtons() {
    const buttons = renderElement({
        tagName: "div",
        attributes: {
            class: `flex flex-col mt-2`
        }
    }, ...data.map((row) => {
        var _a, _b, _c;
        return renderElement({
            tagName: "div",
            attributes: {
                class: "h-12"
            }
        }, renderElement({
            tagName: "button",
            innerText: ":",
            attributes: {
                key: (_c = row[(_b = (_a = metadata.rows[0]) === null || _a === void 0 ? void 0 : _a.Field) !== null && _b !== void 0 ? _b : 0]) !== null && _c !== void 0 ? _c : 0,
                type: "button",
                class: "admin-action-button"
            },
        }));
    }));
    for (let container of buttons.children) {
        const button = container.children[0];
        const editButton = renderElement({
            tagName: "button",
            attributes: {
                type: "button"
            },
            events: {
                "click": () => {
                    showEdit(metadata, data, newDropdown, button.getAttribute("key"));
                    newDropdown.classList.add("hidden");
                }
            }
        }, renderElement({
            tagName: "p",
            innerText: "Editar"
        }));
        const deleteButton = renderElement({
            tagName: "button",
            attributes: {
                type: "button"
            },
            events: {
                "click": () => showDelete(metadata, button.getAttribute("key"))
            }
        }, renderElement({
            tagName: "p",
            innerText: "Excluir"
        }));
        const detailsButton = renderElement({
            tagName: "button",
            attributes: {
                type: "button"
            },
            events: {
                "click": () => showDetails(metadata, data, button.getAttribute("key"))
            }
        }, renderElement({
            tagName: "p",
            innerText: "Detalhes"
        }));
        const newDropdown = renderElement({
            tagName: "div",
            attributes: {
                class: "hidden admin-dropdown-menu"
            }
        }, editButton, deleteButton, detailsButton);
        document.addEventListener("click", (e) => {
            const target = e.target;
            let dropdown = container.children[1];
            if (!dropdown.contains(target) && target !== button) {
                dropdown.classList.add("hidden");
            }
        });
        container.appendChild(newDropdown);
        button.addEventListener("click", (e) => {
            let dropdown = container.querySelector(".admin-dropdown-menu");
            if (!dropdown) {
                console.error("Dropdown not found");
                return;
            }
            dropdown.classList.toggle("hidden");
            dropdown.setAttribute("aria-hidden", dropdown.classList.contains("hidden").toString());
            let posX = e.clientX;
            let posY = e.clientY;
            if (posY >= 720) {
                posY -= dropdown.offsetHeight + 25;
            }
            dropdown.style.left = `${posX - 340}px`;
            dropdown.style.top = `${posY - 50}px`;
        });
    }
    return buttons;
}
function renderPagination(container) {
    var _a;
    return renderElement({
        tagName: "div",
        attributes: {
            class: "flex items-center gap-4 p-2 border-t"
        }
    }, renderElement({
        tagName: "p",
        innerText: `Página ${cached_page + 1}`,
        attributes: {
            class: "text-sm text-black-pure/75 w-16"
        }
    }), renderElement({
        tagName: "button",
        innerText: "Previous",
        attributes: {
            type: "button",
            class: "hover:underline"
        },
        events: {
            click: () => {
                if (cached_page > 0) {
                    renderContent(container, metadata, cached_page - 1);
                }
            }
        }
    }), renderElement({
        tagName: "button",
        innerText: "Next",
        attributes: {
            type: "button",
            class: "hover:underline"
        },
        events: {
            click: () => renderContent(container, metadata, cached_page + 1)
        }
    }), renderElement({
        tagName: "div",
        attributes: {
            class: "flex items-center gap-2 ml-auto"
        }
    }, renderElement({
        tagName: "label",
        innerText: "Registros por página",
        attributes: {
            class: "text-sm text-black-pure/75"
        }
    }), renderElement({
        tagName: "input",
        attributes: {
            type: "number",
            min: "1",
            max: "100",
            value: `${(_a = localStorage.getItem("per_page")) !== null && _a !== void 0 ? _a : 12}`,
            class: "w-16 px-1 py-0.5 border border-primary-dark border-opacity-10 rounded-md outline-none focus:border-opacity-100"
        },
        events: {
            input: (e) => localStorage.setItem("per_page", e.target.value)
        }
    })));
}
export default renderContent;
