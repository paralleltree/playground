import { Options } from './options'
import { Operation } from './operation'
import { PartitionOperation } from './partition_operation'
import { GatherOperation } from './gather_operation'

const getOperation = (opts: Options): Operation => {
  if (opts.isInverse) {
    return new GatherOperation(".", opts.delimiter);
  } else {
    return new PartitionOperation('.', opts.delimiter);
  }
}

const main = async () => {
  const [, , ...args] = process.argv;
  if (args.length == 0) {
    console.log('Usage: rearrange [--gather] <delimiter>');
    return;
  }

  const opts = new Options(args);
  const op = getOperation(opts);
  await op.exec();
}

main();
