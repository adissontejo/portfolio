declare function preval<T>(
  literals: TemplateStringsArray,
  ...interpolations: Array<unknown>
): T;
declare function preval<T>(code: string): T;
declare namespace preval {
  function require<T>(modulePath: string, ...args: Array<unknown>): T;
}
