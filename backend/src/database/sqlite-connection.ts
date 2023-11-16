import { Database, SQLQueryBindings } from "bun:sqlite";
import { IDatabaseConnection } from "./i-database-connection";

export class SqliteConnection implements IDatabaseConnection {
	private db;
	constructor(environment = "development") {
		this.db = new Database(`database/database.${environment}.sqlite`, {
			create: true,
		});

		this.db
			.query(
				`CREATE TABLE IF NOT EXISTS TODOS(
            id TEXT PRIMARY KEY,
            description TEXT,
            done BOOLEAN
          );`,
			)
			.run();
	}

	query<T, U>(sql: string, params: U): T[] {
		const query = this.db.query(sql);
		return query.all(params as SQLQueryBindings) as T[];
	}

	queryFirst<T, U>(sql: string, params: U): T {
		const query = this.db.query(sql);
		return query.get(params as SQLQueryBindings) as T;
	}
}
