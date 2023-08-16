import shadow from './shadow.js';

type Custom = { [key: string]: { [key: string]: string } };

export default function filter(valuePortion: string, custom: Custom) {
  const extractFnV = valuePortion.split('--');
  let result = '';
  extractFnV.forEach((element) => {
    result = result + extractValue(element, custom) + ' ';
  });

  return result.replace(/[\s]$/, '');
}

// return f(value); blur(40px)
function extractValue(each: string, custom: Custom) {
  const extractFnV = each.split(/^[-]?([a-zA-Z-]+)/);
  let f = extractFnV[1];
  let v = extractFnV[2];
  if (/-$/.test(f)) {
    f = f.replace(/-$/, '');
    //v = '-' + v;//--------------------------no negative value accepted
  }
  if (f.match(/drop-shadow|ds/)) {
    return func[f] + '(' + shadow(v, custom) + ')';
  }

  if (func.hasOwnProperty(f)) {
    const fn = func[f];
    if (fn) {
      return fn + '(' + v.replace(/p$/, '%').replace(/(?<=[0-9])[d](?=[0-9])/, '.') + ')';
    }
  }
}

const func: { [key: string]: string } = {
  b: 'blur',
  blur: 'blur',
  br: 'brightness',
  brightness: 'brightness',
  'drop-shadow': 'drop-shadow',
  ds: 'drop-shadow',
  c: 'contrast',
  contrast: 'contrast',
  g: 'grayscale',
  grayscale: 'grayscale',
  hr: 'hue-rotate',
  'hue-rotate': 'hue-rotate',
  i: 'invert',
  invert: 'invert',
  o: 'opacity',
  opacity: 'opacity',
  saturate: 'saturate',
  s: 'saturate',
  se: 'sepia',
  sepia: 'sepia',
};
