// This file depends directly on `crud.ts` and `render.ts`
// is responsible for sending POST requests to the server to create, edit, and delete records in the database.

import renderContent from "../../admin/renderContent.js";
import { NotificationType } from "../../enum/render.js";
import { renderNotification } from "../../Render/index.js";
import { TableMetadata } from "../../types/admin.js";

/**
 * Sends a POST request to the server to insert a new record in the database.
 * 
 * @param {Event} e - The event that triggered the function.
 * @param {() => void} deleteModal - A function that closes the modal.
 * 
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating
 * whether the request was successful.
 */
async function postCreate(e: Event, metadata: TableMetadata, deleteModal: () => void) {
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
            renderContent(document.querySelector("#structure") as HTMLElement, metadata);
            renderNotification('Dados registrados com sucesso!', NotificationType.Success);
            deleteModal();
        } else {
            // const error = await response.json();
            // console.error('Error:', error);
            renderNotification('Ocorreu um erro ao tentar inserir os dados.', NotificationType.Error);
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        renderNotification("Um erro inesperado ocorreu", NotificationType.Error);
    }

    return false;
}


async function postCreateUser(e: Event, metadata: TableMetadata, deleteModal: () => void) {
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
            'create_user/', // For some unholy reason, the URL must end with a slash
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
            renderContent(document.querySelector("#structure") as HTMLElement, metadata);
            renderNotification('Usuário criado com sucesso!', NotificationType.Success);
            deleteModal();
        } else {
            // const error = await response.json();
            // console.error('Error:', error);
            renderNotification('Ocorreu um erro ao tentar criar o usuário.', NotificationType.Error);
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        renderNotification("Um erro inesperado ocorreu", NotificationType.Error);
    }

    return false;
}


/**
 * Handles the edit form submission for a post, sends the data to the server via a POST request,
 * and updates the UI based on the response.
 *
 * @param {Event} e - The event object from the form submission.
 * @param {TableMetadata} metadata - Metadata about the table, including the index of the item being edited.
 * @param {() => void} hideEdit - A callback function to hide the edit form.
 * @returns {Promise<boolean>} - Returns a promise that resolves to false.
 *
 * @throws {Error} If an unexpected error occurs during the fetch operation.
 */
async function postEdit(e: Event, metadata: TableMetadata, hideEdit: () => void) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    formData.append("id", metadata.index.toString());

    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
        if (typeof value === 'string') {
            data[key] = value;
        }
    });

    hideEdit();

    try {
        // Make the POST request
        const response = await fetch(
            'update/', // For some unholy reason, the URL must end with a slash
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
            renderContent(document.querySelector("#structure") as HTMLElement, metadata);
            renderNotification('Dados alterados com sucesso!', NotificationType.Success);
        } else {
            // const error = await response.json();
            // console.error('Error:', error);
            renderNotification('Ocorreu um erro ao tentar alterar os dados.', NotificationType.Error);
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        renderNotification("Um erro inesperado ocorreu", NotificationType.Error);
    }

    return false;
}


/**
 * Sends a POST request to the server to delete a record from the database.
 *
 * @param {() => void} deleteModal - A function that closes the modal.
 * @param {number} key - The value of the primary key of the record to be deleted.
 *
 * @returns {Promise<void>} A promise that resolves when the request has finished.
 */
async function postDelete(metadata: TableMetadata, deleteModal: () => void, key: number) {
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
            renderContent(document.querySelector("#structure") as HTMLElement, metadata);
            renderNotification('Dados deletados com sucesso!', NotificationType.Success);
            deleteModal();
        } else {
            // console.error('Error:', await response.text());
            renderNotification('Ocorreu um erro ao deletar os dados', NotificationType.Error);
        }
    } catch (error) {
        // console.error('Error:', error);
        renderNotification('Ocorreu um erro ao deletar os dados', NotificationType.Error);
    }
}

export {
    postCreate,
    postCreateUser,
    postEdit,
    postDelete
};
