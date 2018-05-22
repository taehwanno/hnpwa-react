type FunctionType = (...args: any[]) => any;
interface IActionCreatorsMap { [actionCreator: string]: FunctionType; }

export type ActionsUnion<A extends IActionCreatorsMap> = ReturnType<A[keyof A]>;
