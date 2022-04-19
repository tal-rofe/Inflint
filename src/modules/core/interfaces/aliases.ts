export type IMappedFunction = (_: string) => boolean;

export type ITransformedAliases = Record<string, IMappedFunction>;
