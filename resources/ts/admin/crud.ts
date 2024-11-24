import type { 
    TableMetadata 
} from "../types/admin.js";

import {
    renderElement
} from "../Render/index.js";

import {
    renderCreateSection
} from "./utils.js";

import renderContent from "./renderContent.js";


let metadata: TableMetadata;


function createModal() {
    function deleteModal() {
        modal.classList.remove("translate-y-0");
        modal.classList.add("translate-y-[100vh]");
        container.classList.remove("bg-opacity-50");
        setTimeout(() => {
            container.remove();
        }, 500);
    }

    const modal = renderElement({
        tagName: "div",
        attributes: {
            class: `
                flex flex-col
                p-4 bg-white rounded-md 
                shadow-md 
                translate-y-[100vh] 
                transition-transform duration-500
            `,
            style: "z-index: 101;"
        }
    });

    const container = renderElement(
        {
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
        },
        modal
    );

    // For some reason, the setTimeout with 0 delay makes the animation smoother
    setTimeout(() => {
        modal.classList.add("translate-y-0");
        modal.classList.remove("translate-y-[100vh]");
        container.classList.add("bg-opacity-50");
    }, 0);

    return {
        modal,
        deleteModal
    };
}


function showCreate(new_metadata: TableMetadata) {
    metadata = new_metadata;

    let {
        modal,
        deleteModal
    } = createModal();

    const cancelButton = renderElement({
        tagName: "button",
        innerText: "Cancelar",
        attributes: {
            type: "button",
            class: "py-2 hover:underline",
        }
    });

    modal.classList.add("h-4/5", "min-w-[640px]");

    // Header
    renderElement(
        {
            container: modal,
            tagName: "div",
            attributes: {
                class: `
                    flex items-center justify-between 
                    w-full h-fit px-4 py-2
                    border-b-2 border-primary-dark border-opacity-50
                `
            }
        },
        renderElement({
            tagName: "h1",
            innerText: `Criar ${metadata.name}`,
            attributes: {
                class: "text-2xl"
            }
        }),
        cancelButton
    );

    // Body
    renderElement(
        {
            container: modal,
            tagName: "form",
            attributes: {
                class: "flex-1 flex flex-col gap-4 p-4 overflow-auto",
                action: "",
                method: "POST"
            },
            events: {
                submit: (e: Event) => postCreate(e, deleteModal)
            }
        },
        ...metadata.rows.map((column) => {
            return renderCreateSection(column);
        }),
        renderElement({
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
        })
    );

    // Cancel button logic
    cancelButton.addEventListener("click", deleteModal);
}


function showDetails(new_metadata: TableMetadata) {
    metadata = new_metadata;
}


function showEdit(new_metadata: TableMetadata) {
    metadata = new_metadata;
}


function showDelete(new_metadata: TableMetadata) {
    metadata = new_metadata;
}


// Functions to post to the server

async function postCreate(e: Event, deleteModal: () => void) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    formData.append("id", metadata.index.toString());

    // Convert FormData to a plain object
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
        if (typeof value === 'string') {
            data[key] = value;
        }
    });

    try {
        // Make the POST request
        const response = await fetch(
            'insert/', // For some unholy reason, the URL must end with a slash
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify JSON content type
                },
                body: JSON.stringify(data), // Convert data to JSON format
            }
        );

        // Handle the response
        if (response.ok) {
            // const result = await response.json(); // Parse the JSON response
            // console.log('Success:', result);
            alert('Dados registrados com sucesso!');
            deleteModal();
            renderContent(document.querySelector("#structure") as HTMLElement, metadata);
        } else {
            // const error = await response.json();
            // console.error('Error:', error);
            alert('Ocorreu um erro ao tentar inserir os dados.');
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        alert("Um erro inesperado ocorreu");
    }

    return false;
}


// function postEdit() {}


// function postDelete() {}


export {
    showCreate,
    showDetails,
    showEdit,
    showDelete
}
