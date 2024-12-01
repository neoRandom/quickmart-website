var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import renderContent from "../../admin/renderContent.js";
import { NotificationType } from "../../enum/render.js";
import { renderNotification } from "../../Render/index.js";
function postCreate(e, metadata, deleteModal) {
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
function postCreateUser(e, metadata, deleteModal) {
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
            const response = yield fetch('create_user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                renderContent(document.querySelector("#structure"), metadata);
                renderNotification('Usuário criado com sucesso!', NotificationType.Success);
                deleteModal();
            }
            else {
                renderNotification('Ocorreu um erro ao tentar criar o usuário.', NotificationType.Error);
            }
        }
        catch (error) {
            console.error('Unexpected error:', error);
            renderNotification("Um erro inesperado ocorreu", NotificationType.Error);
        }
        return false;
    });
}
function postEdit(e, metadata, hideEdit) {
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
function postDelete(metadata, deleteModal, key) {
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
export { postCreate, postCreateUser, postEdit, postDelete };
