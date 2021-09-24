export abstract class BasicCrud {
  abstract create(...args: any[]);
  abstract find(...args: any[]);
  abstract delete(...args: any[]);
  abstract update(...args: any[]);
}
