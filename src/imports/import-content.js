import https from "https";
import { promises as fsPromises, createWriteStream } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from 'url'; // Required to use __dirname in ES modules
import downloads from "./import-content.json" assert { type: "json" };

// Use __dirname in an ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function downloadFile(url, folder, pageOptions) {
  const fileName = url.split("/").pop();
  const fullPath = join(__dirname, folder, fileName); // Change to __dirname

  try {
    // Ensure the folder exists
    await fsPromises.mkdir(dirname(fullPath), { recursive: true });

    const content = await fetchContent(url);

    // Remove the first heading that starts with "#"
    const processedContent = content.replace(/^\s*#[^\n]*\n/, "");

    // Creating the YAML front matter
    const yamlHeader = `---
title: ${pageOptions.title}
sidebar:
  label: ${pageOptions.label}
  order: ${pageOptions.order}
---

`;

    // Prepending the YAML front matter to the content
    const finalContent = yamlHeader + processedContent;

    // Write the content with YAML header to the file
    await fsPromises.writeFile(fullPath, finalContent);
    console.log(`Downloaded and processed '${fileName}' to '${fullPath}'`);
  } catch (err) {
    console.error(`Error downloading or saving the file: ${err.message}`);
  }
}

function fetchContent(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve(data);
      });

      response.on('error', (err) => {
        reject(err);
      });
    });
  });
}

// Loop through all entries in the YAML-like config
for (const projectKey in downloads) {
  const project = downloads[projectKey];
  for (const pageKey in project.pages) {
    const page = project.pages[pageKey];
    downloadFile(page.src, page.folder, page.pageOptions);
  }
}
