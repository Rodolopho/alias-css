export default function transform(data: string) {
  data = data.replace(/^-/, '');
  let statement = '';
  data.split(/--/).forEach((e) => {
    if (e) {
      const result = transformEach(e);
      if (result) statement += result + ' ';
    }
  });

  if (statement) return statement;
  return null;
}
function transformEach(data: string) {
  const match = /([a-zA-z]+(3d)?)(([-]?[0-9]+[d]?[0-9]*[a-z]*))+/;
  const exfunc = data.match(match);
  let func = null;
  if (exfunc) {
    func = exfunc[1];
  }
  if (!func) return;
  let statement = '';
  if (tfAlias.hasOwnProperty(func)) {
    statement += tfAlias[func] + '(';
    statement +=
      data
        .replace(func, '')
        .replace(/_/g, ', ')
        .replace(/(?<=[0-9])[d](?=[0-9])/g, '.')
        .replace(/(?<=[0-9])[p](?=[\s|,])/g, '%')
        .replace(/p$/, '%') + ')';
    return statement;
  } else {
    return null;
  }
}

const tfAlias: { [key: string]: string } = {
  m: 'matrix',
  matrix: 'matrix',
  t: 'translate',
  translate: 'translate',
  tx: 'translateX',
  translateX: 'translateX',
  ty: 'translateY',
  translateY: 'translateY',
  s: 'scale',
  scale: 'scale',
  sx: 'scaleX',
  scaleX: 'scaleX',
  sy: 'scaleY',
  scaleY: 'scaleY',
  r: 'rotate',
  rotate: 'rotate',
  sk: 'skew',
  skew: 'skew',
  skx: 'skewX',
  skewX: 'skewX',
  sky: 'skewY',
  skewY: 'skewY',
  m3d: 'matrix3d',
  matrix3d: 'matrix3d',
  t3d: 'translate3d',
  translate3d: 'translate3d',
  tz: 'translateZ',
  translateZ: 'translateZ',
  s3d: 'scale3d',
  scale3d: 'scale3d',
  sz: 'scaleZ',
  scaleZ: 'scaleZ',
  r3d: 'rotate3d',
  rotate3d: 'rotate3d',
  rx: 'rotateX',
  rotateX: 'rotateX',
  ry: 'rotateY',
  rotateY: 'rotateY',
  rz: 'rotateZ',
  rotateZ: 'rotateZ',
  p: 'perspective',
  perspective: 'perspective',
};
