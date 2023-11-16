export interface IDatabaseConnection {
    query(sql: string, params?: any): any
    queryFirst(sql: string, params?: any): any
}