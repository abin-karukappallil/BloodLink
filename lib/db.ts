import Databse from "better-sqlite3";
const db= new Databse("db/mydatabse.db");
db.exec(
    `CREATE TABLE IF NOT EXIST DONORS(
    id INTEGER PRIMARY KEY AUTO INCREMENT
    name TEXT NOT NULL
    phoneNumber TEXT NOT NULL,
    address TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
    );`
);

export default db;