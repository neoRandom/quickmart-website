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
function renderContent(container, new_metadata) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        metadata = new_metadata;
        const payload = yield fetch(`get_registers/?id=${metadata.index}`);
        if (payload.status !== 200) {
            renderNotification("Não foi possível carregar os dados da tabela.", NotificationType.Warning);
            return false;
        }
        data = yield payload.json().catch((_) => {
            renderNotification("Não foi possível carregar os dados da tabela.", NotificationType.Warning);
            return false;
        });
        const placeholder = (_a = container.children[1]) === null || _a === void 0 ? void 0 : _a.children[1];
        const table = renderElement({
            tagName: "div",
            attributes: {
                class: "flex flex-col gap-4 flex-1 mt-8"
            }
        }, renderElement({
            tagName: "div",
            attributes: {
                class: "flex flex-1"
            }
        }, renderElement({
            tagName: "div",
            attributes: {
                class: "flex flex-col flex-1 h-full"
            }
        }, renderTableHeader(), renderTableRows()), renderTableActions()), renderElement({
            tagName: "div",
            innerText: "Page 1 of N",
            attributes: {
                class: "mt-2"
            }
        }));
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
                    grid gap-x-2
                    h-8 mb-2 
                    border-b-2 border-neutral-200 
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
                    flex flex-col 
                    *:h-8 *:*:px-2 *:my-2 
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
    return actions;
}
function renderTableActionsButtons() {
    const buttons = renderElement({
        tagName: "div",
        attributes: {
            class: `flex flex-col *:my-2`
        }
    }, ...data.map((row) => {
        var _a, _b, _c;
        return renderElement({
            tagName: "div",
            attributes: {
                class: "relative"
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
                    showEdit(metadata, data, dropdown, button.getAttribute("key"));
                    dropdown.classList.add("hidden");
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
        const dropdown = renderElement({
            tagName: "div",
            attributes: {
                class: "hidden admin-dropdown-menu"
            }
        }, editButton, deleteButton, detailsButton);
        document.addEventListener("click", (e) => {
            var _a, _b;
            const target = e.target;
            if (!((_a = container.children[1]) === null || _a === void 0 ? void 0 : _a.contains(target)) && target !== button) {
                (_b = container.children[1]) === null || _b === void 0 ? void 0 : _b.classList.add("hidden");
            }
        });
        container.appendChild(dropdown);
        button.addEventListener("click", () => {
            var _a;
            (_a = container.children[1]) === null || _a === void 0 ? void 0 : _a.classList.toggle("hidden");
        });
    }
    return buttons;
}
export default renderContent;
