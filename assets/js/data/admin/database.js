var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchMetadata(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        let metadata;
        let payload = yield fetch(`get_metadata/?id=${id}`);
        if (payload.status !== 200) {
            return null;
        }
        metadata = yield payload.json();
        metadata.index = id;
        metadata.sizes = calculateTableSize(metadata.rows);
        metadata.pk = (_b = (_a = metadata.rows.find(row => row.Key === "PRI")) === null || _a === void 0 ? void 0 : _a.Field) !== null && _b !== void 0 ? _b : "";
        return metadata;
    });
}
function calculateTableSize(metadataSQL) {
    var _a, _b;
    let sizes = {
        total: 0,
        columns: []
    };
    for (let rowData of metadataSQL) {
        if (rowData.Type.includes("char") || rowData.Type.includes("binary")) {
            let columnSize = parseInt((_b = (_a = rowData.Type.split("(")[1]) === null || _a === void 0 ? void 0 : _a.split(")")[0]) !== null && _b !== void 0 ? _b : "1");
            let gridCols = Math.min(Math.ceil(columnSize / 12), 4);
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
function fetchData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let data;
        const payload = yield fetch(url);
        if (payload.status !== 200) {
            return 3;
        }
        data = yield payload.json().catch((_) => {
            return 2;
        });
        if (data.length === 0) {
            return 1;
        }
        return data;
    });
}
export { fetchMetadata, fetchData };
