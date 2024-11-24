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
import { renderCreateSection } from "./utils.js";
import renderContent from "./renderContent.js";
let metadata;
function showCreate(new_metadata) {
    metadata = new_metadata;
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
            class: "w-3/4 mx-auto mt-6 p-3 bg-primary text-white rounded-md transition-colors hover:bg-primary-dark"
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
function showDetails(new_metadata) {
    metadata = new_metadata;
}
function showEdit(new_metadata) {
    metadata = new_metadata;
}
function showDelete(new_metadata) {
    metadata = new_metadata;
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
                renderContent(document.querySelector("#structure"), metadata);
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
export { showCreate, showDetails, showEdit, showDelete };
