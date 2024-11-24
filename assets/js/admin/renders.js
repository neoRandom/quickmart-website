import { renderElement, renderTag } from "../Render/index.js";
function renderUpperHeader(metadata, container) {
    renderElement({
        container: container, tagName: "header",
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
}
function renderBody(metadata, data, container) {
    const searchBar = renderSearchBar();
    const table = renderBodyTable(metadata, data);
    renderElement({
        container: container,
        tagName: "div",
        attributes: {
            class: "flex-1 flex flex-col p-4 *:w-full"
        }
    }, searchBar, table, renderElement({
        tagName: "div",
        innerText: "Page 1 of N",
        attributes: {
            class: "mt-2"
        }
    }));
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
function renderBodyTable(metadata, data) {
    const tableHeader = renderTableHeader(metadata);
    const tableRows = renderTableRows(metadata, data);
    const tableActions = renderTableActions(data);
    const table = renderElement({
        tagName: "div",
        attributes: {
            class: "flex flex-1 mt-8"
        }
    }, renderElement({
        tagName: "div",
        attributes: {
            class: "flex flex-col flex-1 h-full"
        }
    }, tableHeader, tableRows), tableActions);
    return table;
}
function renderTableHeader(metadata) {
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
function renderTableRows(metadata, data) {
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
function renderTableActions(data) {
    const actionButtons = renderTableActionsButtons(data);
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
function renderTableActionsButtons(data) {
    const buttons = renderElement({
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
    return buttons;
}
export { renderUpperHeader, renderBody };
