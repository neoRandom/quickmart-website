type SQLMetadata = {
    Field: string,
    Type: string,
    Null: string,
    Key: string,
    Default: any,
    Extra: string
}

type TableMetadata = {
    name: string,
    rows: SQLMetadata[],
    sizes: {
        total: number,
        columns: number[]
    }
};

type TableData = Record<string, any>[];

export {
    SQLMetadata,
    TableMetadata,
    TableData
};
