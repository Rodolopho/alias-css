import mediaSelector from "./static/media.js"
import pseudoAndElement from './static/pseudoSelectorAndElement.js';
// import getPropertyAndValue from "./propertyAndValue.js";
import getPropertyAndValue from "./mainPropertyAndValue.js";
import { staticClassNamesAlias } from "./static/staticClassNamesAlias.js";
import { customStaticClassNames } from "./static/customStaticClassNames.js";
import config from './config.js'
 import cssProperties from './css-properties-all.js'
// import cssProperties from '../'
import helper from './helper.js';
import {customColors} from './static/customColors.js'



export const compiler:{[key:string]:any}={
    cache:{propertyAndValue:{...customStaticClassNames}},
    custom:{...{color:customColors}},
    mediaSelector,
    staticClassNames:{...staticClassNamesAlias,...helper().generateStaticClassNames(cssProperties,config['css-global-values'])},
    cssProps:{...helper().makeAliasProperties(cssProperties),...cssProperties},

    extend(data:{[key:string]:Property}){
        const newData={...helper().makeAliasProperties(data),...data}
        this.cssProps={...this.cssProps,...newData};
        this.staticClassNames={...this.staticClassNames,...helper().generateStaticClassNames(data,config['css-global-values'])};
    },

    make(className:string,as?:string, bool?:boolean){
        let [media, elementAndPseudo,important,workingClassName]=['','','',className.replace(/[_][\.]([a-zA-Z])/g,(s,e)=>"_"+e.toUpperCase()).replace(/[.]/g,"d").replace(/[%]/g,'p')]
        // First Check if its has media
        const [mediaProperty] :any =workingClassName.match(this.mediaSelector.test)?workingClassName.match(this.mediaSelector.test):[null];
        if(mediaProperty){
            media=this.mediaSelector.target[mediaProperty];
            workingClassName=workingClassName.replace(mediaProperty,'');
        }
        
        // process --important flag
        if(/(-i|--important)$/.test(className)){
            important=' !important';
            workingClassName=workingClassName.replace(/(-i|--important)$/,'');
        }
        // process Pseudo State
        const pseudoAndElementResult=pseudoAndElement(workingClassName);
        workingClassName=pseudoAndElementResult[1];
        elementAndPseudo=pseudoAndElementResult[0];
        // ---------------------------------------------------------------------
        
        const pnv=workingClassName.replace(/^-/,'');
        let result :any ='';
        // x-class
        
         if(/^(x-width|x-height)/.test(pnv)){
            const extract=getPropertyAndValue(pnv.replace('x-',''), this.cssProps, this.staticClassNames, this.custom);
            if(typeof extract === 'string'){
                const [p,v]=extract.split(':');
                if(p && v){
                    result=`${p}:calc(${v} + var(--${p}-grow) - var(--${p}-shrink));--${p}:${v};--${p}-grow:0px;--${p}-shrink:0px`
                }
            }
         
        }else if(this.cache.propertyAndValue.hasOwnProperty(pnv)){
            result=this.cache.propertyAndValue[pnv];
        }else{
            try {
                result=getPropertyAndValue(pnv, this.cssProps, this.staticClassNames, this.custom);
            } catch (error) {
               console.log(error) 
            }
            
        }
        if(result){
            className=className.replace(/([.%=\]\[@~:*#\(\)\/^])/g,'\\$1');
            if(bool===true) return result;
            this.cache.propertyAndValue[pnv]=result;
            if(media){
                return `${media}{.${
                       (as?as:className)+ elementAndPseudo
                     }{${result}${important}}}`;
            }else{
                return `.${(as?as:className)}${elementAndPseudo}{${result}${important}}`;
            }

        }else{
            console.log(`Unable to process ${className} [media:${media},pseudoSelector:${elementAndPseudo},imp:${important}]`)
        }

    },

    group(str:string, as:string){
        // return this.make(str,as);
        // let const [statement, container]=['', '\n'];
        let statement='';
        [...str.trim().split(/\s+/)].forEach((e)=>{
            const getEachClassNameCompiled=this.make(e,as);
            if(getEachClassNameCompiled) statement += getEachClassNameCompiled + ' \n';
        })

        return statement;
    },
    prebuild(a: string | { [key: string]: string }, b: string) {
        if (typeof a === 'object') {
        for (const key in a) {
            if (a.hasOwnProperty(key)) this.cache.propertyAndValue[key] = a[key];
        }
        } else {
        if (a && b) {
            this.cache.propertyAndValue[a] = b;
        }
        }
    },
    groupForJs(str: string, bool: boolean) {
        if (!str.trim()) return '';
        const jsStyle: { [key: string]: any } = {};
        const list = str.trim().split(/\s+/);
        list.forEach((e:string) => {
        let pNv: any = '';
        if (this.cache.propertyAndValue.hasOwnProperty(e)) {
            pNv = this.cache.propertyAndValue[e];
        } else {
            pNv = getPropertyAndValue(e,this.cssProps,this.staticClassNames, this.custom);
            if (pNv) this.cache.propertyAndValue[e] = pNv;
        }
        if (!pNv) return '';
        const result = pNv.split(':');
        if (result.length === 2) {
            const key = result[0].replace(/-([a-z])/g, (e:string, a:string) => {
            return a.toUpperCase();
            });
            let value: string |number  = bool === true ? result[1].replace(/px$/g, '') : result[1];
            if (typeof value === 'string' && value.trim().match(/^[\d\.]+$/)) {
                value = parseFloat(value.toString());
            }

            jsStyle[key] = value;
        }
        });

        return jsStyle;
  },
  // for config
  groupObj(obj: { [key: string]: string }) {
    if (typeof obj !== 'object') return false;
    let statement = '';

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const result = this.group(obj[key], key);
        if (result) {
          statement += result + '\n';
        }
      }
    }
    return statement;
  },    

addCustom(name: string, obj: { [key: string]: string }) {
    if (typeof obj === 'object') {
      if (!this.custom[name]) this.custom[name] = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) this.custom[name][key] = obj[key];
      }
    }
  },
addMedia(obj:{['test']?:RegExp,prefix:{[key:string]:string}}){
    if(obj.hasOwnProperty('test')){
        this.mediaSelector.test=test;
    }
    if(obj.hasOwnProperty('prefix')){
        for(const key in obj.prefix){
            if(obj.prefix.hasOwnProperty(key)){
                this.mediaSelector.target[key]=obj.prefix[key];
            }
            
        }
    }

}
};

// ----------------------------------Extras

type Property = {
    alias:string,
    type:string,
    values:[],
    compiler:(...args: any[]) => any,
    [key:string]:any

}


// compiler.staticClassNames={...helper().generateStaticClassNames(compiler.cssProps,config['css-global-values'])};
// compiler.addCustom('color',customColors)