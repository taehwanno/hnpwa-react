declare const __DEV__: boolean;
declare const __PROD__: boolean;

interface IWindow {
  __PRELOADED_STATE__: object;
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
