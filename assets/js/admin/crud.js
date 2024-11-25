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
import { getRegister, generateCreateSection, generateInput, generateModal } from "./utils.js";
import renderContent from "./renderContent.js";
import { NotificationType } from "../enum/render.js";
let metadata;
let editing = -1;
let cachedLI;
let cachedDropdown;
function showCreate(new_metadata) {
    metadata = new_metadata;
    let { modal, deleteModal } = generateModal();
    const cancelButton = renderElement({
        tagName: "button",
        innerText: "Cancelar",
        attributes: {
            type: "button",
            class: "py-2 hover:underline",
        },
        events: {
            click: deleteModal
        }
    });
    modal.classList.add("max-h-[80%]", "min-w-[640px]");
    renderElement({
        container: modal,
        tagName: "div",
        attributes: {
            class: `
                    flex items-center justify-between 
                    w-full h-fit px-4 py-2
                    border-b-2 border-primary-dark border-opacity-50
                `
        }
    }, renderElement({
        tagName: "h2",
        innerText: `Criar ${metadata.name}`,
        attributes: {
            class: "text-2xl"
        }
    }), cancelButton);
    renderElement({
        container: modal,
        tagName: "form",
        attributes: {
            class: "flex-1 flex flex-col gap-4 p-4 overflow-y-auto",
            action: "",
            method: "POST"
        },
        events: {
            submit: (e) => postCreate(e, deleteModal)
        }
    }, ...metadata.rows.map((column) => {
        return generateCreateSection(column);
    }), renderElement({
        tagName: "button",
        innerText: "Criar",
        attributes: {
            type: "submit",
            class: `
                    text-white 
                    w-3/4 mx-auto 
                    mt-6 p-3 
                    bg-primary hover:bg-primary-dark 
                    rounded-md transition-colors
                `
        }
    }));
}
function showDetails(new_metadata, data, key) {
    metadata = new_metadata;
    let register = getRegister(data, metadata, key);
    let { modal, deleteModal } = generateModal();
    const cancelButton = renderElement({
        tagName: "button",
        innerText: "Cancelar",
        attributes: {
            type: "button",
            class: "py-2 hover:underline",
        },
        events: {
            click: deleteModal
        }
    });
    modal.classList.add("max-h-[80%]", "min-w-[640px]");
    renderElement({
        container: modal,
        tagName: "div",
        attributes: {
            class: `
                    flex items-center justify-between 
                    w-full h-fit px-4 py-2
                    border-b-2 border-primary-dark border-opacity-50
                `
        }
    }, renderElement({
        tagName: "h2",
        innerText: `Detalhes do registro ${key}`,
        attributes: {
            class: "text-2xl"
        }
    }), cancelButton);
    renderElement({
        container: modal,
        tagName: "div",
        attributes: {
            class: "flex-1 flex flex-col divide-y p-4 overflow-y-auto"
        }
    }, ...metadata.rows.map((column) => renderElement({
        tagName: "div",
        attributes: {
            class: "flex flex-col gap-2 py-2"
        }
    }, renderElement({
        tagName: "span",
        innerText: `${column.Field}:`,
        attributes: {
            class: "opacity-50 text-sm"
        }
    }), renderElement({
        tagName: "p",
        innerText: register[column.Field],
        attributes: {
            class: "text-sm text-wrap break-all"
        }
    }))));
}
function showEdit(new_metadata, data, dropdown, key) {
    metadata = new_metadata;
    if (editing !== -1)
        hideEdit();
    editing = key;
    let register = getRegister(data, metadata, key);
    let li = document.querySelector(`#row-id-${key}`);
    const form = renderElement({
        tagName: "form",
        attributes: {
            id: `edit-id-${key}`,
            class: "grid gap-x-2",
            style: `grid-template-columns: repeat(${metadata.sizes.total}, minmax(0, 1fr));`,
            action: "",
            method: "POST"
        },
        events: {
            submit: postEdit
        }
    }, ...Object.keys(register).map((key, i) => generateInput(metadata.rows[i], {
        id: key,
        name: key,
        value: register[key],
        style: `grid-column: span ${metadata.sizes.columns[i]} / span ${metadata.sizes.columns[i]};`
    })));
    li.replaceWith(form);
    cachedLI = li;
    const newDropdown = renderElement({
        tagName: "div",
        attributes: {
            id: `dropdown-id-${key}`,
            class: "hidden admin-dropdown-menu"
        }
    }, renderElement({
        tagName: "input",
        attributes: {
            type: "submit",
            form: `edit-id-${key}`,
            value: "Salvar",
            class: "cursor-pointer"
        }
    }), renderElement({
        tagName: "button",
        attributes: {
            type: "button"
        },
        events: {
            "click": () => {
                hideEdit();
            }
        }
    }, renderElement({
        tagName: "p",
        innerText: "Cancelar"
    })));
    dropdown.replaceWith(newDropdown);
    cachedDropdown = dropdown;
}
function hideEdit() {
    if (editing === -1)
        return;
    let form = document.querySelector(`#edit-id-${editing}`);
    form.replaceWith(cachedLI);
    let dropdown = document.querySelector(`#dropdown-id-${editing}`);
    dropdown.replaceWith(cachedDropdown);
    editing = -1;
}
function showDelete(new_metadata, key) {
    metadata = new_metadata;
    let { modal, deleteModal } = generateModal();
    const acceptButton = renderElement({
        tagName: "button",
        innerText: "Deletar",
        attributes: {
            type: "button",
            class: `
                text-white 
                px-2 py-1
                bg-red-600 hover:bg-red-700
                rounded-md transition-colors
            `
        },
        events: {
            click: () => postDelete(deleteModal, key)
        }
    });
    const cancelButton = renderElement({
        tagName: "button",
        innerText: "Cancelar",
        attributes: {
            type: "button",
            class: "px-2 py-1 hover:underline",
        },
        events: {
            click: deleteModal
        }
    });
    renderElement({
        container: modal,
        tagName: "div",
        attributes: {
            class: `flex flex-col gap-4 w-fit`
        }
    }, renderElement({
        tagName: "h2",
        innerText: `Deletar ${metadata.name}`,
        attributes: {
            class: "text-center text-2xl pb-2 border-b-2 border-secondary border-opacity-50"
        }
    }), renderElement({
        tagName: "p",
        innerText: `Você realmente deseja deletar o registro ${key}?`,
        attributes: {
            class: "text-center"
        }
    }), renderElement({
        tagName: "div",
        attributes: {
            class: "flex gap-4 *:flex-1"
        }
    }, acceptButton, cancelButton));
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
                renderContent(document.querySelector("#structure"), metadata);
                renderNotification('Dados registrados com sucesso!', NotificationType.Success);
                deleteModal();
            }
            else {
                renderNotification('Ocorreu um erro ao tentar inserir os dados.', NotificationType.Error);
            }
        }
        catch (error) {
            console.error('Unexpected error:', error);
            renderNotification("Um erro inesperado ocorreu", NotificationType.Error);
        }
        return false;
    });
}
function postEdit(e) {
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
        hideEdit();
        try {
            const response = yield fetch('update/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                renderContent(document.querySelector("#structure"), metadata);
                renderNotification('Dados alterados com sucesso!', NotificationType.Success);
            }
            else {
                renderNotification('Ocorreu um erro ao tentar alterar os dados.', NotificationType.Error);
            }
        }
        catch (error) {
            console.error('Unexpected error:', error);
            renderNotification("Um erro inesperado ocorreu", NotificationType.Error);
        }
        return false;
    });
}
function postDelete(deleteModal, key) {
    return __awaiter(this, void 0, void 0, function* () {
        const formData = new FormData();
        formData.append("id", metadata.index.toString());
        for (let column of metadata.rows) {
            if (column.Key === "PRI") {
                formData.append(`${column.Field}`, key.toString());
                break;
            }
        }
        const data = {};
        formData.forEach((value, key) => {
            if (typeof value === 'string') {
                data[key] = value;
            }
        });
        try {
            const response = yield fetch('delete/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                renderContent(document.querySelector("#structure"), metadata);
                renderNotification('Dados deletados com sucesso!', NotificationType.Success);
                deleteModal();
            }
            else {
                renderNotification('Ocorreu um erro ao deletar os dados', NotificationType.Error);
            }
        }
        catch (error) {
            renderNotification('Ocorreu um erro ao deletar os dados', NotificationType.Error);
        }
    });
}
export { showCreate, showDetails, showEdit, showDelete, hideEdit };
