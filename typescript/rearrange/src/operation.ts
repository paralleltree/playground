export abstract class Operation {
  constructor(protected targetPath: string, protected delimiter: string) {
  }

  abstract exec(): Promise<void>;
}
