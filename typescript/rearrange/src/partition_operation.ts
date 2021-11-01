import { IOperation } from './operation';
import { existsSync, mkdirSync } from 'fs';
import * as fs from 'fs/promises';
import { dirname, sep } from 'path';

export class PartitionOperation implements IOperation {
  constructor(public targetPath: string, public delimiter: string) {
  }

  async exec(): Promise<void> {
    const targetDir = await fs.readdir(this.targetPath, { withFileTypes: true });
    const targetFiles = targetDir.filter(file => file.isFile()).map(file => file.name);

    targetFiles.forEach(async file => {
      const dest = file.replace(this.delimiter, sep);
      const destDir = dirname(dest);
      if (!existsSync(dest)) {
        mkdirSync(destDir, { recursive: true });
      }
      await fs.rename(file, dest);
    });
  }
}
