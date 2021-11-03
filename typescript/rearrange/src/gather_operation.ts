import { Operation } from './operation';
import * as fs from 'fs/promises';
import { dirname, relative, resolve, join, sep } from 'path';

export class GatherOperation extends Operation {

  getDestPath(srcPath: string): string {
    const absFilePath = resolve(srcPath);
    const absRootPath = resolve(this.targetPath);
    const rootRelativePath = relative(absRootPath, absFilePath)
    return join(absRootPath, rootRelativePath.replace(sep, this.delimiter));
  }

  async exec(): Promise<void> {
    const rootDir = await fs.readdir(this.targetPath, { withFileTypes: true });
    const targetDirs = rootDir.filter(file => file.isDirectory()).map(file => join(this.targetPath, file.name));
    targetDirs.forEach(path => this.processDirectory(path));
  }

  async processDirectory(dirPath: string): Promise<void> {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const subDirs = entries.filter(file => file.isDirectory()).map(file => join(dirPath, file.name));
    subDirs.forEach(path => this.processDirectory(path));

    const files = entries.filter(file => file.isFile()).map(file => join(dirPath, file.name));
    files.forEach(async file => {
      const dest = this.getDestPath(file);
      await fs.rename(file, dest);
    });

    fs.rmdir(dirPath);
  }
}
