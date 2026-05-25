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
    console.log('Connected successfully. Altering table enquiries to add place and last_school_studied...');
    
    // Add columns if they do not exist
    const alterQuery = `
      ALTER TABLE enquiries 
      ADD COLUMN IF NOT EXISTS place TEXT,
      ADD COLUMN IF NOT EXISTS last_school_studied TEXT;
    `;
    await client.query(alterQuery);
    console.log('Columns place and last_school_studied added successfully.');
    
  } catch (err) {
    console.error('Error executing migration:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
