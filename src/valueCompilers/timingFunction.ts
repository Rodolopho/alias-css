export default function timingFunction(data: string, custom: { [key: string]: { [key: string]: string } }) {
  data = data.replace(/^[-_]/, '');
  const holder = '';
  const cbm = /(cubic-bezier|cb)[-_]?(([0-9][d]?[0-9]*[-|_]?){4})/;
  if (cbm.test(data)) {
    const extractData = cbm.exec(data);
    if (extractData) {
      const fData = extractData[2];
      return 'cubic-bezier(' + fData.replace(/[-_]/g, ',').replace(/d/g, '.') + ' )';
    }
  } else if (/^(e|ease|l|linear|ei|ease-in|eo|ease-out|eio|ease-in-out|ss|step-start|se|step-end)$/.test(data)) {
    return func[data];
  }
}
const func: { [key: string]: string } = {
  e: 'ease',
  ease: 'ease',
  linear: 'linear',
  l: 'linear',
  ei: 'ease-in',
  'ease-in': 'ease-in',
  eo: 'ease-out',
  'ease-out': 'ease-out',
  eio: 'ease-in-out',
  'ease-in-out': 'ease-in-out',
  ss: 'step-start',
  'step-start': 'step-start',
  se: 'step-end',
  'step-end': 'step-end',
};
