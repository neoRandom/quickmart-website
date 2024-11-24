/**
 * Represents metadata for a SQL column.
 * 
 * @property {string} Field - The name of the column.
 * @property {string} Type - The data type of the column.
 * @property {string} Null - Specifies if the column can have null values ('YES' or 'NO').
 * @property {string} Key - Indicates if the column is indexed.
 * @property {any} Default - The default value for the column.
 * @property {string} Extra - Additional information about the column.
 */
type SQLMetadata = {
    Field: string;
    Type: string;
    Null: string;
    Key: string;
    Default: any;
    Extra: string;
}


/**
 * Represents the metadata for a table.
 * 
 * @property {number} index - The index of the table in the database.
 * @property {string} name - The name of the table.
 * @property {SQLMetadata[]} rows - The metadata for each column in the table.
 * @property {{total: number, columns: number[]}} sizes - An object describing the size of each column in the table.
 *  - `total` is the sum of all the column sizes.
 *  - `columns` is an array of integers, each representing the size of a column.
 */
type TableMetadata = {
    index: number;
    name: string;
    rows: SQLMetadata[];
    sizes: {
        total: number;
        columns: number[];
    };
};


/**
 * Represents the data for a table.
 * 
 * An array of objects, where each object has the column names as keys and the values are the data for that row.
 */
type TableData = Record<string, any>[];


export {
    SQLMetadata,
    TableMetadata,
    TableData
};
