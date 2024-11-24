var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderElement } from "../Render/index.js";
let data;
let metadata;
function renderContent(container, new_metadata) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        metadata = new_metadata;
        const payload = yield fetch(`get_registers/?id=${metadata.index}`);
        if (payload.status !== 200) {
            alert("Não foi possível carregar os dados da tabela.");
            return false;
        }
        data = yield payload.json().catch((_) => {
            alert("Não foi possível carregar os dados da tabela.");
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
    }, ...metadata.rows.map((column, i) => renderElement({
        tagName: "div",
        innerText: column.Field,
        attributes: {
            title: column.Field,
            class: "truncate",
            style: `grid-column: span ${metadata.sizes.columns[i]} / span ${metadata.sizes.columns[i]};`
        }
    })));
    return header;
}
function renderTableRows() {
    const rows = renderElement({
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
    }, ...data.map((_) => renderElement({
        tagName: "div",
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
    for (let container of buttons.children) {
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
            const editButton = renderElement({
                tagName: "button",
                attributes: {
                    type: "button"
                },
                events: {
                    "click": (e) => {
                        e.stopPropagation();
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
                    "click": (e) => {
                        e.stopPropagation();
                    }
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
                    "click": (e) => {
                        e.stopPropagation();
                    }
                }
            }, renderElement({
                tagName: "p",
                innerText: "Detalhes"
            }));
            activeDropdown = renderElement({
                tagName: "div",
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
                            active:*:bg-primary active:*:text-white active:*:transition-none
                        `
                }
            }, editButton, deleteButton, detailsButton);
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
    return buttons;
}
export default renderContent;
