export class Graph {
  public readonly id!: string;
  public readonly name!: string;
  public readonly unit!: string;
  public readonly type!: GraphType;
  public readonly color!: GraphColor;
  public readonly timezone!: string;
  public readonly purgeCacheURLs!: string[];
  public readonly selfSufficient!: string;
  public readonly isSecret!: boolean;
  public readonly publishOptionalData!: boolean;
}

export type GraphType = 'int' | 'float';
export type GraphColor = 'shibafu' | 'momiji' | 'sora' | 'ichou' | 'ajisai' | 'kuro';
