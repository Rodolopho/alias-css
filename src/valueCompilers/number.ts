export default function number(str: string, custom: { [key: string]: { [key: string]: string } }) {
  // if (typeof custom.string === "object") {
  //   if (custom.string.hasOwnProperty(str)) return custom.string[str];
  // }
  return str
    .replace(/by/g, ' / ')
    .replace(/(span)/g, '$1 ')
    .replace(/[d]/, '.');
}
