import { Options } from './options'
import { PartitionOperation } from './partition_operation'

const main = async () => {
  const [, , ...args] = process.argv;
  if (args.length == 0) {
    console.log('Usage: rearrange [--gather] <delimiter>');
    return;
  }

  const opts = new Options(args);

  if (opts.isInverse) {

  } else {
    await new PartitionOperation('.', opts.delimiter).exec();
  }
}

main();
