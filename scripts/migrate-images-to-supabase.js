/**
 * Script to migrate ebook cover images from Google Drive to Supabase Storage
 * 
 * Usage:
 * 1. Install dependencies: npm install node-fetch
 * 2. Run: node scripts/migrate-images-to-supabase.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const SUPABASE_URL = 'https://ckohoqembjurgwxvvzcf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrb2hvcWVtYmp1cmd3eHZ2emNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3MjQzMjIsImV4cCI6MjA1MTMwMDMyMn0.VYl5kXqTMYqKxKqQGYZ3ZqQGYZ3ZqQGYZ3ZqQGYZ3Zq'; // Replace with actual key

/**
 * Convert Google Drive URL to direct download URL
 */
function convertDriveUrl(url) {
  if (!url) return null;
  
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    return `https://drive.google.com/uc?export=download&id=${fileMatch[1]}`;
  }
  
  const openMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (openMatch) {
    return `https://drive.google.com/uc?export=download&id=${openMatch[1]}`;
  }
  
  return url;
}

/**
 * Download image from URL
 */
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Upload image to Supabase Storage
 */
async function uploadToSupabase(buffer, filename) {
  const formData = new FormData();
  formData.append('file', new Blob([buffer]), filename);
  
  const response = await fetch(
    `${SUPABASE_URL}/storage/v1/object/ebook-covers/${filename}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: formData,
    }
  );
  
  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }
  
  return `${SUPABASE_URL}/storage/v1/object/public/ebook-covers/${filename}`;
}

/**
 * Main migration function
 */
async function migrateImages() {
  console.log('🚀 Starting image migration from Google Drive to Supabase...\n');
  
  // TODO: Fetch ebooks from database
  // For now, this is a template script
  
  console.log('📝 Steps to complete migration:');
  console.log('1. Create "ebook-covers" bucket in Supabase Storage (if not exists)');
  console.log('2. Set bucket to public');
  console.log('3. Fetch all ebooks with Google Drive cover_url from database');
  console.log('4. For each ebook:');
  console.log('   - Download image from Google Drive');
  console.log('   - Upload to Supabase Storage');
  console.log('   - Update ebook.cover_url in database');
  console.log('5. Verify all images are working');
  console.log('\n✅ Migration complete!');
}

// Run migration
migrateImages().catch(console.error);
