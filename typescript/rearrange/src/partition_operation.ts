import { existsSync } from 'fs';
import * as fs from 'fs/promises';
import { dirname, relative, resolve, join, sep } from 'path';
import { Operation } from './operation';

export class PartitionOperation extends Operation {
  getDestPath(srcPath: string): string {
    const absFilePath = resolve(srcPath);
    const absRootPath = resolve(this.targetPath);
    const rootRelativePath = relative(absRootPath, absFilePath)
    return join(absRootPath, rootRelativePath.replace(this.delimiter, sep));
  }

  public async exec(): Promise<void> {
    const targetDir = await fs.readdir(this.targetPath, { withFileTypes: true });
    const targetFiles = targetDir.filter(file => file.isFile()).map(file => file.name);

    targetFiles.forEach(async file => {
      const dest = this.getDestPath(file);
      const destDir = dirname(dest);
      if (!existsSync(dest)) {
        await fs.mkdir(destDir, { recursive: true });
      }
      await fs.rename(file, dest);
    });
  }
}
