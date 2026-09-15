declare module 'better-sqlite3' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export interface Statement<T = any> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(...params: any[]): T | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    all(...params: any[]): T[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    run(...params: any[]): { changes: number; lastInsertRowid: number | bigint };
  }

  export interface Database {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare<T = any>(sql: string): Statement<T>;
    exec(sql: string): this;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transaction<T>(fn: () => T): () => T;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pragma(pragma: string): any;
    close(): void;
  }

  export type { Database };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function BetterSqlite3(filename: string, options?: any): Database;
  export default BetterSqlite3;
}
