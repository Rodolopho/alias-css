export default function string(str: string, custom: { [key: string]: { [key: string]: string } }) {
  return str.replace(/^[-]/, '').replace(/--/g,', ');
}
