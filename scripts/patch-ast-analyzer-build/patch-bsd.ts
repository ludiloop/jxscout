import * as fs from "fs";

// Pattern to match: freebsd"===process.platform)if("x64"===process.arch
const pattern =
  /freebsd\"===process\.platform\)if\(\"x64\"===process\.arch/g;

// Replacement pattern
const replacement =
  "freebsd\"===process.platform)if(\"amd64\"===process.arch";

function patchFile(filePath: string) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const patchedContent = content.replaceAll(pattern, replacement);

    if (content === patchedContent) {
      console.error(`Error: No matching pattern found in file: ${filePath}`);
      process.exit(1);
    }

    fs.writeFileSync(filePath, patchedContent);
    console.log(`Patched file: ${filePath}`);
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    process.exit(1);
  }
}

// Main execution
const targetFile = process.argv[2];
if (!targetFile) {
  console.error("Please provide a target file path");
  process.exit(1);
}

if (!fs.existsSync(targetFile)) {
  console.error(`File ${targetFile} does not exist`);
  process.exit(1);
}

console.log(`Starting patch process for file: ${targetFile}`);
patchFile(targetFile);
console.log("Patch process completed");
