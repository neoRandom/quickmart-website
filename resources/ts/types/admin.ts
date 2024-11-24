type SQLMetadata = {
    Field: string,
    Type: string,
    Null: string,
    Key: string,
    Default: any,
    Extra: string
}

type TableMetadata = {
    rows: SQLMetadata[],
    sizes: {
        total: number,
        columns: number[]
    }
};

type TableData = {
    name: string,
    metadata: TableMetadata,
    rows: any[]
}

export {
    SQLMetadata,
    TableMetadata,
    TableData
};
