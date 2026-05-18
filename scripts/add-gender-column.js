const { Client } = require('pg');

const connectionString = 'postgresql://postgres:%3FWGRkpAaKGX3cyk@db.ecazlhecquqtrkcrvejw.supabase.co:5432/postgres';

async function main() {
  console.log('Connecting to database...');
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('Connected successfully. Altering table enquiries to add gender...');
    
    // 1. Add gender column with a temporary default (vital if there are existing rows)
    const addColQuery = `
      ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS gender TEXT NOT NULL DEFAULT 'Male';
    `;
    await client.query(addColQuery);
    console.log('Column gender added successfully.');
    
    // 2. Drop the default so new submissions are forced to supply the value
    const dropDefaultQuery = `
      ALTER TABLE enquiries ALTER COLUMN gender DROP DEFAULT;
    `;
    await client.query(dropDefaultQuery);
    console.log('Dropped default on column gender.');
    
  } catch (err) {
    console.error('Error executing migration:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
