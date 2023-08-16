export default function font(font: string, custom: { [key: string]: { [key: string]: string } }): string {
  font = font.replace(/^[-_]/, '');
  if (custom.hasOwnProperty('font') && typeof custom.font === 'object') {
    if (custom.color.hasOwnProperty(font)) return custom.font[font];
  }
  let holder = '';

  font.split(/--/).forEach((e) => {
    if (e.search(/_/) !== -1) {
      holder += '"' + e.replace(/_/g, ' ') + '", ';
    } else {
      holder += e + ', ';
    }
  });

  return holder.replace(/,[\s]$/, '');
}
