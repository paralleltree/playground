export class Options {
  public isInverse: boolean = false;
  public delimiter: string = "_";

  constructor(args: string[]) {
    const iter = args[Symbol.iterator]();
    while (true) {
      const result = iter.next();
      if (result.done) break;

      const arg = result.value;
      switch (arg) {
        case "--gather":
          this.isInverse = true;
          break;

        default:
          this.delimiter = arg;
          break;
      }
    }
  }
}
