import length from './length.js';
import color from './color.js';

export default function shadow(data: string, custom: { [key: string]: { [key: string]: string } }) {
  let holder = '';
  const m = /(([-]?(i|inset)?[0-9]+[d]?[0-9]*(px|em|p|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))+)[-_]([\w-]+)/;

  data.split(/--/).forEach((e) => {
    if (m.test(e)) {
      if (e.match(/^[-]?(i|inset)/)) {
        holder += 'inset ';
      }

      const result = m.exec(e);
      if (result) {
        const col = color(result[5], custom);
        const len = length(result[1], custom);
        holder += len + ' ' + col + ',';
      }
    }
  });

  return holder.replace(/[,]$/, '');
}
