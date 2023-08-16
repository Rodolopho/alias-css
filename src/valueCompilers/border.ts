import color from './color.js';
import length from './lengthUnsigned.js';
export default function border(data: string, custom: { [key: string]: { [key: string]: string } }) {
  const [l, s, c] = data.replace(/^-/,'').split('-');
  const col = color(c, custom);
  const sty = style.hasOwnProperty(s) ? style[s] : '';

  const len = length(l, custom); // .replace(/d/,".");

  return len + ' ' + sty + ' ' + col;
}

const style: { [key: string]: string } = {
  n: 'none',
  none: 'none',
  s: 'solid',
  solid: 'solid',
  r: 'ridge',
  ridge: 'ridge',
  o: 'outset',
  outset: 'outset',
  i: 'inset',
  inset: 'inset',
  h: 'hidden',
  hidden: 'hidden',
  g: 'groove',
  groove: 'groove',
  db: 'double',
  double: 'double',
  dotted: 'dotted',
  dt: 'dotted',
  ds: 'dashed',
  dashed: 'dashed',
};
