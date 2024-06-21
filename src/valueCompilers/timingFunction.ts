export default function timingFunction(data: string, custom: { [key: string]: { [key: string]: string } }) {
  data = data.replace(/^[-_]/, '');

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

        let result:string='';
        const test1=/(cubic-bezier|cb)(([-_][01][d]?[0-9]?){4})/;
        const test2=/(steps|s)[-_]([0-9]+)[-]((jump)?[-]?(start|end|none|both))/;
        data.split('--').forEach((e)=>{
            if(test1.test(e)){
                result= result+ e.replace(test1,(e,f,g)=>f+"("+g.replace(/-/,"").replace(/-/g,", ").replace(/d/g,".")+")") +", ";
            }else if(test2.test(e)){
                result=result+e.replace(test2,(e,f,g,h)=>"steps"+"("+g+", " + h+")")+", ";      
            }else if(/^(e|ease|l|linear|ei|ease-in|eo|ease-out|eio|ease-in-out|ss|step-start|se|step-end)$/.test(e)){
                result=result+func[e]+", ";
            }
        })
        if(result.trim()) return result.trim().replace(/[,]$/,'');

    }



// export default function timingFunction(data: string, custom: { [key: string]: { [key: string]: string } }) {
//   data = data.replace(/^[-_]/, '');
//   const holder = '';
//   const cbm = /(cubic-bezier|cb)[-_]?(([0-9][d]?[0-9]*[-|_]?){4})/;
//   if (cbm.test(data)) {
//     const extractData = cbm.exec(data);
//     if (extractData) {
//       const fData = extractData[2];
//       return 'cubic-bezier(' + fData.replace(/[-_]/g, ',').replace(/d/g, '.') + ' )';
//     }
//   } else if (/^(e|ease|l|linear|ei|ease-in|eo|ease-out|eio|ease-in-out|ss|step-start|se|step-end)$/.test(data)) {
//     return func[data];
//   }
// }
// const func: { [key: string]: string } = {
//   e: 'ease',
//   ease: 'ease',
//   linear: 'linear',
//   l: 'linear',
//   ei: 'ease-in',
//   'ease-in': 'ease-in',
//   eo: 'ease-out',
//   'ease-out': 'ease-out',
//   eio: 'ease-in-out',
//   'ease-in-out': 'ease-in-out',
//   ss: 'step-start',
//   'step-start': 'step-start',
//   se: 'step-end',
//   'step-end': 'step-end',
// };
