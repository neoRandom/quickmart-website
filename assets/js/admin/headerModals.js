import { NotificationType } from "../enum/render.js";
import { renderElement, renderNotification } from "../Render/index.js";
import { generateModal } from "./utils.js";
function generateDevModal() {
    let { modal, deleteModal } = generateModal();
    const cancelButton = renderElement({
        tagName: "button",
        innerText: "Cancelar",
        attributes: {
            type: "button",
            class: "absolute right-4 py-2 hover:underline",
        },
        events: {
            click: deleteModal
        }
    });
    modal.classList.add("max-h-[80%]", "w-[680px]");
    renderElement({
        container: modal,
        tagName: "div",
        attributes: {
            class: `
                    relative flex items-center justify-between 
                    w-full h-fit px-4 py-2
                    border-b-2 border-black-pure border-opacity-50
                `
        }
    }, renderElement({
        tagName: "h2",
        innerText: `Desenvolvedores`,
        attributes: {
            class: "w-full text-2xl text-center font-semibold"
        }
    }), cancelButton);
    let body = {
        "Fellipe Leonardo Peixoto Cunha": "Atualmente um estudante de Desenvolvimento de Sistemas, mas apaixonado desde a infância por tecnologia.",
        "Bárbara Fernandes Rampazi": "Estudante do curso de DS, novata na área da tecnologia, mas aprimorando minhas habilidades.",
        "Enzo de Paulo Souto": "Sou um jovem estudante, desenvolvendo minhas habilidades em DS, buscando aprimorar meus conhecimentos."
    };
    renderElement({
        container: modal,
        tagName: "div",
        attributes: {
            class: "flex-1 flex flex-col gap-4 p-4 overflow-y-auto"
        }
    }, renderElement({
        tagName: "div",
        attributes: {
            class: "flex flex-col divide-y w-4/5 mx-auto px-8 py-2 *:py-4 rounded-md shadow-md border border-black-pure border-opacity-10"
        }
    }, ...Object.keys(body).map((key) => renderElement({
        tagName: "div",
        attributes: {
            class: "flex flex-col gap-2"
        }
    }, renderElement({
        tagName: "h3",
        innerText: key,
        attributes: {
            class: "text-lg font-semibold"
        }
    }), renderElement({
        tagName: "p",
        innerText: body[key],
        attributes: {
            class: "text-wrap break-words"
        }
    })))), renderElement({
        tagName: "div",
        attributes: {
            class: "text-center mt-4"
        }
    }, renderElement({
        tagName: "p",
        innerText: "Centro Paula Souza - Etec da Zona Leste"
    }), renderElement({
        tagName: "p",
        innerText: "Desenvolvimento de Sistemas - 2º Módulo - Turma A"
    })));
}
function generateSupportModal() {
    let { modal, deleteModal } = generateModal();
    const cancelButton = renderElement({
        tagName: "button",
        innerText: "X",
        attributes: {
            type: "button",
            class: `
                absolute top-4 right-4
                flex items-center justify-center 
                font-semibold text-white 
                w-8 aspect-square rounded-full 
                hover:bg-red-600 transition-colors
            `,
        },
        events: {
            click: deleteModal
        }
    });
    modal.classList.remove("p-4");
    modal.classList.add("max-h-[80%]", "w-[520px]");
    renderElement({
        container: modal,
        tagName: "div",
        attributes: {
            class: `
                    relative flex items-center justify-between 
                    w-full h-fit p-4 bg-primary
                    border-b-2 border-secondary rounded-t-md
                `
        }
    }, renderElement({
        tagName: "h2",
        innerText: `Suporte - Fale Conosco`,
        attributes: {
            class: "text-secondary text-center w-full text-2xl font-semibold"
        }
    }), cancelButton);
    let fields = {
        "name": [
            "Nome",
            "Joao Paulo da Silva",
            "128"
        ],
        "telephone": [
            "Telefone",
            "(11) 12345-6789",
            "15"
        ],
        "email": [
            "E-mail",
            "joao.paulo@exemplo.com",
            "320"
        ]
    };
    renderElement({
        container: modal,
        tagName: "div",
        attributes: {
            class: "flex-1 flex flex-col gap-4 p-4 overflow-y-auto"
        }
    }, renderElement({
        tagName: "form",
        attributes: {
            action: "",
            method: "POST",
            class: "flex flex-col gap-4 p-4 pt-0"
        },
        events: {
            submit: (e) => {
                e.preventDefault();
                renderNotification("Mensagem enviada com sucesso", NotificationType.Success);
                deleteModal();
                return false;
            }
        }
    }, ...Object.keys(fields).map((key) => {
        var _a, _b, _c, _d, _e;
        return renderElement({
            tagName: "div",
            attributes: {
                class: "flex flex-col gap-2"
            }
        }, renderElement({
            tagName: "label",
            innerText: (_a = fields[key]) === null || _a === void 0 ? void 0 : _a[0],
            attributes: {
                for: key,
                class: "indent-2 text-sm opacity-80"
            }
        }), renderElement({
            tagName: "input",
            attributes: {
                required: "",
                id: key,
                name: key,
                placeholder: (_c = (_b = fields[key]) === null || _b === void 0 ? void 0 : _b[1]) !== null && _c !== void 0 ? _c : "",
                maxlength: (_e = (_d = fields[key]) === null || _d === void 0 ? void 0 : _d[2]) !== null && _e !== void 0 ? _e : "",
                class: "px-2 py-1 w-full default-border rounded-md"
            }
        }));
    }), renderElement({
        tagName: "div",
        attributes: {
            class: "flex flex-col gap-2 mt-4"
        }
    }, renderElement({
        tagName: "label",
        innerText: "Mensagem",
        attributes: {
            for: "message",
            class: "indent-2 text-sm opacity-80"
        }
    }), renderElement({
        tagName: "textarea",
        attributes: {
            id: "message",
            name: "message",
            placeholder: "Sua mensagem aqui...",
            class: "max-h-[115px] p-2 rounded-md default-border",
            style: "resize: none; field-sizing: content;"
        }
    })), renderElement({
        tagName: "button",
        innerText: "Enviar",
        attributes: {
            type: "submit",
            class: "p-2 mx-auto mt-4 w-2/4 bg-white-pure hover:bg-primary hover:text-white border border-primary rounded-md transition-colors"
        }
    })));
}
export { generateDevModal, generateSupportModal };
