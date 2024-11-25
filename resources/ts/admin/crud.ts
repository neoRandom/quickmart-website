import type { 
    TableData,
    TableMetadata 
} from "../types/admin.js";

import {
    renderElement
} from "../Render/index.js";

import {
    getRegister,
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
                max-w-[80%] p-4 bg-white rounded-md 
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
        },
        events: {
            click: deleteModal
        }
    });

    modal.classList.add("max-h-[80%]", "min-w-[640px]");

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
            tagName: "h2",
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
                class: "flex-1 flex flex-col gap-4 p-4 overflow-y-auto",
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
}


function showDetails(new_metadata: TableMetadata, data: TableData, key: number) {
    metadata = new_metadata;

    // Set the register as the row of the data that the key with value key is equal to key (idk anymore what im doing lmao)
    let register = getRegister(data, metadata, key);

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
        },
        events: {
            click: deleteModal
        }
    });

    modal.classList.add("max-h-[80%]", "min-w-[640px]");

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
            tagName: "h2",
            innerText: `Detalhes do registro ${key}`,
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
            tagName: "div",
            attributes: {
                class: "flex-1 flex flex-col divide-y p-4 overflow-y-auto"
            }
        },
        ...metadata.rows.map((column) => 
            renderElement(
                {
                    tagName: "div",
                    attributes: {
                        class: "flex flex-col gap-2 py-2"
                    }
                },
                renderElement({
                    tagName: "span",
                    innerText: `${column.Field}:`,
                    attributes: {
                        class: "opacity-50 text-sm"
                    }
                }),
                renderElement({
                    tagName: "p",
                    innerText: register[column.Field],
                    attributes: {
                        class: "text-sm text-wrap break-all"
                    }
                })
            )
        )
    );
}


function showEdit(new_metadata: TableMetadata) {
    metadata = new_metadata;
}


function showDelete(new_metadata: TableMetadata, key: number) {
    metadata = new_metadata;

    let {
        modal,
        deleteModal
    } = createModal();

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

    renderElement(
        {
            container: modal,
            tagName: "div",
            attributes: {
                class: `flex flex-col gap-4 w-fit`
            }
        },
        renderElement({
            tagName: "h2",
            innerText: `Deletar ${metadata.name}`,
            attributes: {
                class: "text-center text-2xl pb-2 border-b-2 border-secondary border-opacity-50"
            }
        }),
        renderElement({
            tagName: "p",
            innerText: `Você realmente deseja deletar o registro ${key}?`,
            attributes: {
                class: "text-center"
            }
        }),
        renderElement(
            {
                tagName: "div",
                attributes: {
                    class: "flex gap-4 *:flex-1"
                }
            },
            acceptButton,
            cancelButton
        )
    );
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


// async function postEdit() {}


async function postDelete(deleteModal: () => void, key: number) {
    const formData = new FormData();

    formData.append("id", metadata.index.toString());

    for (let column of metadata.rows) {
        if (column.Key === "PRI") {
            formData.append(`${column.Field}`, key.toString());
            break;
        }
    }

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
            'delete/', // For some unholy reason, the URL must end with a slash
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
            alert('Dados deletados com sucesso!');
            deleteModal();
            renderContent(document.querySelector("#structure") as HTMLElement, metadata);
        } else {
            // console.error('Error:', await response.text());
            alert('Ocorreu um erro ao deletar os dados');
        }
    } catch (error) {
        // console.error('Error:', error);
        alert('Ocorreu um erro ao deletar os dados');
    }
}


export {
    showCreate,
    showDetails,
    showEdit,
    showDelete
};
