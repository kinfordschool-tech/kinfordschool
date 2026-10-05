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
    console.log('Connected successfully. Creating table gallery...');
    
    const query = `
      CREATE TABLE IF NOT EXISTS gallery (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        url text NOT NULL,
        title text,
        category text,
        "order" integer DEFAULT 0,
        created_at timestamp with time zone DEFAULT now()
      );

      -- Ensure storage bucket 'gallery' exists
      INSERT INTO storage.buckets (id, name, public)
      VALUES ('gallery', 'gallery', true)
      ON CONFLICT (id) DO NOTHING;

      -- Allow public operations on storage.objects for 'gallery' bucket
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Public Access Gallery'
        ) THEN
          CREATE POLICY "Public Access Gallery" ON storage.objects FOR SELECT USING (bucket_id = 'gallery');
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Public Upload Gallery'
        ) THEN
          CREATE POLICY "Public Upload Gallery" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery');
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Public Delete Gallery'
        ) THEN
          CREATE POLICY "Public Delete Gallery" ON storage.objects FOR DELETE USING (bucket_id = 'gallery');
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Public Update Gallery'
        ) THEN
          CREATE POLICY "Public Update Gallery" ON storage.objects FOR UPDATE USING (bucket_id = 'gallery');
        END IF;
      END $$;
    `;
    
    await client.query(query);
    console.log('Table gallery and storage bucket created successfully (or already exist).');
  } catch (err) {
    console.error('Error executing migration:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
