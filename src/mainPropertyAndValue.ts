
import helper from './helper.js';
type Property = {
    alias:string,
    type:string,
    values:[],
    compiler:(...args: any[]) => any,
    [key:string]:any

}

const helpers=helper();



export  default function getPropertyAndValue(
    className:string,
     cssPropertiesWithAlias:{},
      staticClassNames:{[key:string]:string},
      custom:{[key:string]:{[key:string]:string}}
      ): string[]|null|{}{

    // Case 1 StaticClassNames
    if(staticClassNames.hasOwnProperty(className)){
        return staticClassNames[className];
    }

    const [property, propertyKey]=helpers.extractProperty(className,cssPropertiesWithAlias);
    if(property){
        const prop=property.property?property.property:propertyKey;

            // Case 2: CSS Variables
            if (/--var--/.test(className)) {
                const splits: string[] = className.split(/--var--/);
                if(cssPropertiesWithAlias.hasOwnProperty(splits[0])){
                    return   prop+": var(--"+splits[1] + ')';
                }
            } 
            // case 3: CSS variable without --var keyword
            const valuePortion=className.replace(propertyKey,'');
            if(/^--[a-z]/.test(valuePortion)){
                return  prop+": var("+valuePortion + ')';
            }
            if(property.hasOwnProperty('compiler') && typeof property.compiler === 'function'){
             
                // const value=property.compiler(valuePortion.replace(/^-/,'') ,custom);
                const value=property.compiler(valuePortion ,custom);
                
                if(value && value != '-'){
                    return prop+":"+value.replace(/([-]?)([\d]|10|11|12)col/g,(m:string,p1:string,p2:string)=>`${p1}${parseFloat(((100/12)*parseFloat(p2)).toFixed(6))}%`);
                }else{
                    console.log(`${className}: '${propertyKey}' unable to compile value:${className.replace(propertyKey,'')}`)
                    return null;
                }
            }else{
                console.log("No Compiler found for:" + className);
            }
        }else{
            console.log(`${className}: is not valid AliasCSS class name`);
        }
    
    return null;
}


