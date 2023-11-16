import { Database } from "bun:sqlite";
import { IDatabaseConnection } from "./i-database-connection";


export class SqliteConnection implements IDatabaseConnection {
    private db;
    constructor(environment: string = "development") {
        this.db = new Database(`database/database.${environment}.sqlite`, { create: true });

        this.db.query(
            `CREATE TABLE IF NOT EXISTS TODOS(
            id TEXT PRIMARY KEY,
            description TEXT,
            done BOOLEAN
          );`
        ).run();
    }

    query(sql: string, params: {}): any {
        const query = this.db.query(sql);
        return query.all(params);
    }

    queryFirst(sql: string, params: {}): any {
        const query = this.db.query(sql);
        return query.get(params);

    }
}