
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const bucketName = 'images';
const imagesDir = './public/images';

async function uploadImages() {
  const files = fs.readdirSync(imagesDir);
  console.log(`Found ${files.length} images to upload...`);

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const fileBuffer = fs.readFileSync(filePath);
    
    console.log(`Uploading ${file}...`);
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(file, fileBuffer, {
        upsert: true,
        contentType: 'image/jpeg' // All listed are .jpg or .jpeg
      });

    if (error) {
       if (error.message.includes('bucket not found')) {
         console.error('ERROR: Bucket "images" not found. Please create it first in Supabase Storage and set it to PUBLIC.');
         return;
       }
       console.error(`Error uploading ${file}:`, error.message);
    } else {
      console.log(`Successfully uploaded ${file}`);
    }
  }

  console.log('Image upload finished!');
}

uploadImages();
