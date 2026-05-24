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
    console.log('Connected successfully. Altering table enquiries to add email...');

    // 1. Add email column with a temporary default (vital if there are existing rows)
    const addColQuery = `
      ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS email TEXT NOT NULL DEFAULT 'temporary@example.com';
    `;
    await client.query(addColQuery);
    console.log('Column email added successfully.');

    // 2. Drop the default so new submissions are forced to supply the value
    const dropDefaultQuery = `
      ALTER TABLE enquiries ALTER COLUMN email DROP DEFAULT;
    `;
    await client.query(dropDefaultQuery);
    console.log('Dropped default on column email.');

  } catch (err) {
    console.error('Error executing migration:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
