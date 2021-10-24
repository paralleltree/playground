import { existsSync, mkdirSync } from 'fs';
import * as fs from 'fs/promises';
import { dirname, sep } from 'path';

const main = async () => {
  const [, , ...args] = process.argv;
  if (args.length == 0) {
    console.log('Usage: rearrange <delimiter>');
    return;
  }

  let targetDirPath = '.';
  let delimiter = args[0];

  // non-recursive
  const targetDir = await fs.readdir(targetDirPath, { withFileTypes: true });
  const targetFiles = targetDir.filter(file => file.isFile()).map(file => file.name);

  targetFiles.forEach(async file => {
    const dest = file.replace(delimiter, sep);
    const destDir = dirname(dest);
    if (!existsSync(dest)) {
      mkdirSync(destDir, { recursive: true });
    }
    await fs.rename(file, dest);
  });
}

main();
