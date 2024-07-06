
import helper from './lib/helper.js'
import postcss from 'postcss';
import config from './lib/config.js'
import cssProperties from './lib/css-properties-all.js';
import {styleJSX , main} from './lib/index.js';

//console.log(postcss.parse(styleJSX("fs12 br45 mt24 width-100 bgc-red")));
postcss([])
  .process('.h1{color:        red}' , {from: 'undefined'})
  .then(result => {
    console.log(result.css);
  });


// const data={
//     "display":{
//         alias:'d',
//         values:['flex:f','block:b','inline:i'],
//         compiler:(val)=>val
//     },
//     "color":{
//         alias:'d',
//         values:['flux:f','block:b','inline:i'],
//         //compiler:(val)=>val,
//     }
// }



//  acss.config(config);
//  acss.run();
// acss.watch()