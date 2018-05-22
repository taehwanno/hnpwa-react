declare const __DEV__: boolean;
declare const __PROD__: boolean;
declare const __SERVER__: boolean;

// tslint:disable-next-line
interface Window {
  __PRELOADED_STATE__: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: <R>(a: R) => R;
}

declare module '*.css' {
  const value: string;
  export default value;
}
declare module '*.png' {
  const value: string;
  export default value;
}
declare module '*.scss' {
  const value: string;
  export default value;
}
