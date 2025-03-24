import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL in environment variables.");
}

export const db = neon(process.env.DATABASE_URL);

const schema = async () => {
  try {
    await db`
      CREATE TABLE IF NOT EXISTS DONORS (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phoneNumber TEXT NOT NULL,
        city TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        bloodGroup TEXT DEFAULT 'NULL'
      )
    `;
    await db `
    
    CREATE TABLE IF NOT EXISTS HOSPITALS (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phoneNumber TEXT NOT NULL,
      city TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
      )`;
      await db `
    
      CREATE TABLE IF NOT EXISTS ALERTS (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        intensity TEXT NOT NULL,
        hospitalId INT NOT NULL,
        date date NOT NULL,
        CONSTRAINT fk_hospital FOREIGN KEY (hospitalId) REFERENCES HOSPITALS(id)
        )`;
    console.log("Table created successfully.");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

schema();
