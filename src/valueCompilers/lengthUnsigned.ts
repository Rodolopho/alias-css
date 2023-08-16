export default function length(length: string, custom: { [key: string]: { [key: string]: string } }): string | null {
  if (custom.hasOwnProperty('length') && typeof custom.length === 'object') {
    if (custom.length.hasOwnProperty(length)) return custom.length[length];
  }

  const match = length.match(/[-]?[0-9]+[d]?[0-9]*(px|em|p|ex|ch|rem|vw|fr|vh|vmin|vmax|cm|mm|in|pt|pc|cv)/g);
  if (match) {
    return match
      .join()
      .replace(/p(,)|p$/g, '%$1')
      .replace(/d/g, '.')
      .replace(/[,]/g, ' ')
      .replace(/-/g,'');
  } else return null;
}
