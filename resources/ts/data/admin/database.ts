import { SQLMetadata, TableData, TableMetadata } from "../../types/admin.js";


/**
 * Fetches the metadata of a table from the server.
 * 
 * @param id The index of the table to fetch the metadata from.
 * @returns The metadata of the table.
 */
async function fetchMetadata(id: number) {
    let metadata: TableMetadata;
    let payload = await fetch(`get_metadata/?id=${id}`);

    if (payload.status !== 200) {
        return null;
    }

    metadata = await payload.json();
    metadata.index = id;
    metadata.sizes = calculateTableSize(metadata.rows);
    metadata.pk = metadata.rows.find(row => row.Key === "PRI")?.Field ?? "";

    return metadata;
}


/**
 * Calculates the total size of a table based on its metadata.
 * The size of a column is based on the type of the column. If the type is char or binary,
 * the size is the length of the column divided by 12. Otherwise, the size is 1.
 * @param metadataSQL The metadata of the table to calculate the size of.
 * @returns The total size of the table.
 */
function calculateTableSize(metadataSQL: SQLMetadata[]) {
    let sizes: { total: number, columns: number[] } = {
        total: 0,
        columns: []
    };

    for (let rowData of metadataSQL) {
        if (rowData.Type.includes("char") || rowData.Type.includes("binary")) {
            let columnSize = parseInt(rowData.Type.split("(")[1]?.split(")")[0] ?? "1");
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


/**
 * Fetches data from the given URL and returns it as a `TableData` object.
 * If an error occurs during the fetch or parsing process, a number is returned
 * indicating the type of error:
 * - `3`: The HTTP response status is not 200.
 * - `2`: An error occurred while parsing the JSON response.
 * - `1`: The fetched data is an empty array.
 *
 * @param url - The URL to fetch data from.
 * @returns A promise that resolves to a `TableData` object or an error code number.
 */
async function fetchData(url: string): Promise<TableData | number> {
    let data: TableData;

    const payload = await fetch(url);
    if (payload.status !== 200) {
        return 3;
    }

    data = await payload.json().catch((_) => {
        return 2;
    });

    if (data.length === 0) {
        return 1;
    }

    return data;
}


export {
    fetchMetadata,
    fetchData
}
