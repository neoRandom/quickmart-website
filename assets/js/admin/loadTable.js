var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderUpperHeader, renderBody } from "./renders.js";
const sideMenu = document.querySelector("#sidebar");
const crudContainer = document.querySelector("#side-container");
let tablesMetadataCache = [];
function loadTable(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let metadata;
        let data;
        if (tablesMetadataCache[id]) {
            metadata = tablesMetadataCache[id];
        }
        else {
            let payload = yield fetch(`get_metadata?id=${id}`);
            if (payload.status !== 200) {
                alert("Não foi possível carregar a tabela.");
                return;
            }
            metadata = yield payload.json();
            metadata.sizes = calculateTableSize(metadata.rows);
            tablesMetadataCache[id] = metadata;
        }
        const payload = yield fetch(`get_registers?id=${id}`);
        if (payload.status !== 200) {
            alert("Não foi possível carregar os dados da tabela.");
            return;
        }
        data = yield payload.json();
        const menuItens = sideMenu.querySelectorAll("div > ul > li");
        menuItens.forEach((e, i) => {
            if (i === id)
                e.classList.add("selected-item");
            else
                e.classList.remove("selected-item");
        });
        renderTable(metadata, data);
        crudContainer.classList.remove("hidden");
    });
}
;
function calculateTableSize(metadataSQL) {
    var _a, _b;
    let sizes = {
        total: 0,
        columns: []
    };
    for (let rowData of metadataSQL) {
        if (rowData.Type.includes("char") || rowData.Type.includes("binary")) {
            let columnSize = parseInt((_b = (_a = rowData.Type.split("(")[1]) === null || _a === void 0 ? void 0 : _a.split(")")[0]) !== null && _b !== void 0 ? _b : "1");
            let gridCols = Math.floor(columnSize / 12);
            sizes.columns.push(gridCols);
            sizes.total += gridCols;
        }
        else {
            sizes.columns.push(1);
            sizes.total += 1;
        }
    }
    return sizes;
}
function renderTable(metadata, data) {
    const crudBase = crudContainer.children[0];
    while (crudBase.firstChild) {
        crudBase.removeChild(crudBase.firstChild);
    }
    renderUpperHeader(metadata, crudBase);
    renderBody(metadata, data, crudBase);
}
export default loadTable;
