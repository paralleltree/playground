export interface IOperation {
  targetPath: string
  delimiter: string
  exec(): Promise<void>
}
