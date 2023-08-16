import { compiler } from "./mainCompiler.js"
// import { customStaticClassNames } from "./static/customStaticClassNames.js";

export const main=compiler;

export const styleJSX=(str:string)=>compiler.groupForJs(str);
export const staticClassNames=compiler.staticClassNames;
export const extend=compiler.extend;
