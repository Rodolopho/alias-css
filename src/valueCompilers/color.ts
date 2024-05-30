// custom.color will be provided {primary:'#2d3f3e....}
export default function color(color: string, custom: { [key: string]: { [key: string]: string } }): string | undefined {
  color = color.replace(/^[-_]/, '');
  if (custom.hasOwnProperty('color') && typeof custom.color === 'object') {
    if (custom.color.hasOwnProperty(color)) return custom.color[color];
  }


  // hexadecimal =+ alpha 00-ff
  if (/^[0-9a-fA-F]{3,8}$/.test(color)) {
    return `#${color}`;

    // Name
  } else if (/^[a-zA-Z]+$/.test(color)) {
    return color;
    // rgb/a in number
  } else if (/^[0-9]{9}/.test(color)) {
    if (color.length === 9) return `rgb(${color.replace(/([\d]{3})([\d]{3})([\d]{3})/, '$1,$2,$3')})`;
    else
      return `rgba(${color
        .replace(/([\d]{3})([\d]{3})([\d]{3})([\d]+)/, '$1,$2,$3,$4')
        .replace('d', '.')
        .replace('p', '%')})`;
    //     // RGB
    //         if (color.length === 9) {
    //             //   color.match(/[\d]{3}/g);
    //             //  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    //             return `rgb(${color.match(/[\d]{3}/g)?.join(',')})`
    //         } else {
    //     // RGBA
    //             let a = color.slice(9).replace("d", ".").replace('p','%');
    //             return `rgba(${color.replace(a,'').match(/[\d]{3}/g)?.join(',')},${a})`;
    //         }
    //     // rgb/a in percentage
    //   // ------------New

    //   //  }else if(){

    // ------------End
    //   } else if (/^[0-9]{1,3}p/.test(color) && color.match(/[0-9]+p/g).length >= 3) {
    //     if (/[\d]p$/.test(color) && color.match(/[0-9]+p/g).length == 3) {
    //       return (
    //         "rgb(" + color.replace(/([\d]+)p([\d]+)p([\d]+)p/, "$1%,$2%,$3%") + ")"
    //       );
    //     } else {
    //       return (
    //         "rgba(" +
    //         color.replace(
    //           /([\d]+)p([\d]+)p([\d]+)p([\d][d]?[\d]?)/,
    //           "$1%,$2%,$3%,$4"
    //         ) +
    //         ")"
    //       ).replace("d", ".").replace("p","%");
    //     }
  } else if (/^([\d]{3})([\d]{1,3}p)([\d]{1,3}p)/.test(color)) {
    if (/^([\d]{3})([\d]{1,3}p)([\d]{1,3}p)$/.test(color))
      return 'hsl(' + color.replace(/^([\d]{1,3})([\d]{1,3}p)([\d]{1,3}p)/, '$1,$2,$3').replace(/p/g, '%') + ')';
    else
      return (
        'hsla(' +
        color
          .replace(/^([\d]{1,3})([\d]{1,3}p)([\d]{1,3}p)([\d]+)/, '$1,$2,$3,$4')
          .replace('d', '.')
          .replace(/p/g, '%') +
        ')'
      );
  } else if (/^([\d]{1,3}p)([\d]{1,3}p)([\d]{1,3}p)/.test(color)) {
    if (/^([\d]{1,3}p)([\d]{1,3}p)([\d]{1,3}p$)/.test(color))
      return 'rgb(' + color.replace(/^([\d]{1,3}p)([\d]{1,3}p)([\d]{1,3}p)/, '$1,$2,$3').replace(/p/g, '%') + ')';
    else
      return (
        'rgba(' +
        color
          .replace(/^([\d]{1,3}p)([\d]{1,3}p)([\d]{1,3}p)([\d]+)/, '$1,$2,$3,$4')
          .replace('d', '.')
          .replace(/p/g, '%') +
        ')'
      );

    // HSL/a
    //   } else if (/[0-9]+p/.test(color) && color.match(/[0-9]+p/g).length >= 2) {
    //     if (/[\d]p$/.test(color) && color.match(/[0-9]+p/g).length == 2) {
    //       return (
    //         "hsl(" + color.replace(/([\d]{3})([\d]+)p([\d]+)p/, "$1,$2%,$3%") + ")"
    //       );
    //     } else {
    //       return (
    //         "hsla(" +
    //         color.replace(
    //           /([\d]{3})([\d]+)p([\d]+)p([\d][d]?[\d]?)/,
    //           "$1,$2%,$3%,$4"
    //         ) +
    //         ")"
    //       ).replace("d", ".").replace("p",'%');
    //     }
  } else {
    return;
  }
}
