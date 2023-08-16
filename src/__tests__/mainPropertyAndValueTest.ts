import  getPropertyAndValue  from "../mainPropertyAndValue";
import cssProps from "../css-properties-all";
import helper from "../helper";
import config from "../config";
import {customColors} from '../static/customColors';
 const staticClassNames=helper().generateStaticClassNames(cssProps,config['css-global-values']);
 const cssProperties={...cssProps,...helper().makeAliasProperties(cssProps)};

test(' getPropertyValue()', () => {
  expect(getPropertyAndValue('background-color-red',cssProperties,staticClassNames,{color:customColors})).toEqual('background-color:red');
});
test(' getPropertyValue()', () => {
  expect(getPropertyAndValue('bgc-red',cssProperties,staticClassNames,{color:customColors})).toEqual('background-color:red');
});
test(' getPropertyValue()', () => {
  expect(getPropertyAndValue('bgc-initial',cssProperties,staticClassNames,{color:customColors})).toEqual('background-color:initial');
});
test(' getPropertyValue()', () => {
  expect(getPropertyAndValue('m-1col',cssProperties,staticClassNames,{color:customColors})).toEqual('margin:-'+((100/12)*1).toFixed(6)+'%');
});
test(' getPropertyValue()', () => {
  expect(getPropertyAndValue('m-1col-1px10px-30px',cssProperties,staticClassNames,{color:customColors})).toEqual('margin:-'+((100/12)*1).toFixed(6)+'% -1px 10px -30px');
});




