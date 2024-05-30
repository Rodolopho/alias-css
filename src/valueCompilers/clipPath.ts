export default function clipPath(data: string, custom: { [key: string]: { [key: string]: string } }) {
  const valuePortion: string = data.replace(/^-/, '') || '';
  const match = /^(circle|c|inset|i|polygon|p|ellipse|e|xywh|rect|r)[-]?[\d]/;
  let shape = null;
  let content = '';
  const shapes: { [key: string]: string } = {
    circle: 'circle',
    c: 'circle',
    inset: 'inset',
    i: 'inset',
    ellipse: 'ellipse',
    e: 'ellipse',
    polygon: 'polygon',
    p: 'polygon',
    rect:'rect',
    r:'rect',
    xywh:'xywh',
    url: 'url',
    u: 'url',
  };

  if (valuePortion.match(/^(url|u)/)) {
    content = '#' + valuePortion.replace(/url|u/, '').replace(/^-/, '');
    shape = 'url';
  } else if (valuePortion.match(match)) {
    const extractShape: RegExpMatchArray | null = valuePortion.match(match);
    if (extractShape) {
      shape = shapes[extractShape[1]];
      content = valuePortion
        .replace(extractShape[1], '')
        .replace(/(px|em|p|ex|ch|rem|vw|fr|vh|vmin|vmax|cm|mm|in|pt|pc|cv)/g, '$1 ')
        .replace(/p[\s]|p(,)/g, '%$1 ')
        .replace(/_/g, ', ')
        .replace('-at', ' at ')
        .replace('-round', ' round ').replace(/-([0-9])/g,'$1');
      // content=length(valuePortion.replace(extractShape,''));
    }
  } else {
    return false;
  }
  return shape + '(' + content + ')';
}
