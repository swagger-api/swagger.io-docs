import https from "https";
import { promises as fsPromises, createWriteStream } from "fs";
import { join, dirname } from "path";
import downloads from "./import-content.json" assert { type: "json" };

async function downloadFile(url, folder, pageOptions) {
  const fileName = url.split("/").pop();
  const fullPath = join(process.cwd(), folder, fileName);

  try {
    // Ensure the folder exists
    await fsPromises.mkdir(dirname(fullPath), { recursive: true });

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    // Reading the content from the response
    let content = await response.text();

    // Remove the first heading that starts with "#"
    content = content.replace(/^\s*#[^\n]*\n/, "");

    // Creating the YAML front matter
    const yamlHeader = `---
title: ${pageOptions.title}
sidebar:
  label: ${pageOptions.label}
  order: ${pageOptions.order}
---

`;

    // Prepending the YAML front matter to the content
    content = yamlHeader + content;

    // Write the content with YAML header to the file
    await fsPromises.writeFile(fullPath, content);
    console.log(`Downloaded and processed '${fileName}' to '${fullPath}'`);
  } catch (err) {
    console.error(`Error downloading or saving the file: ${err.message}`);
  }
}

// Loop through all entries in the YAML-like config
for (const projectKey in downloads) {
  const project = downloads[projectKey];
  for (const pageKey in project.pages) {
    const page = project.pages[pageKey];
    downloadFile(page.src, page.folder, page.pageOptions);
  }
}
