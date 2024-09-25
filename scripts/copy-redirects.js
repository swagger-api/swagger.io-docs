import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the source file and the destination directory
const sourceFile = path.join(__dirname, '../_redirects');
const destinationDir = path.join(__dirname, '../dist');
const destinationFile = path.join(destinationDir, '_redirects');

// Ensure that the destination directory exists
if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir, { recursive: true });
}

// Copy the file
fs.copyFile(sourceFile, destinationFile, (err) => {
  if (err) {
    console.error('Error copying the redirects file:', err);
  } else {
    console.log('Redirects file copied to the dist folder successfully!');
  }
});
