export interface IDatabaseConnection {
	query<T, U>(sql: string, params?: U): T[];
	queryFirst<T, U>(sql: string, params?: U): T;
}
