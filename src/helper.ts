
type Property = {
    alias:string,
    type:string,
    values:[],
    property:string,
    compiler:Function,
}
export default function helper() : {[key:string]:any} {
    return {
        //create new object for alias with property=property-name out of full semantic classnames
        makeAliasProperties(data :{[key:string]:Property}){
            let aliasProps:{[key:string]:Property}={};
            Object.keys(data).map((key:string)=>{
                //check if it has alias properties
                if(data[key].hasOwnProperty('alias') && data[key].alias){
                    if(aliasProps.hasOwnProperty(data[key].alias)){
                        console.log('Duplicate AliasClassName property@'+key+':'+data[key].alias);
                        console.log(` Alias class name '${data[key].alias}'  of '${key}' is already used by '${aliasProps[data[key].alias].property}'`);
                        return;
                    }
                    aliasProps[data[key].alias]=data[key];
                    aliasProps[data[key].alias].property=key;

                    //check if it has compiler means its may be dynamic
                    if(data[key].hasOwnProperty('compiler') && typeof data[key].compiler !== 'function'){

                    }
                }
            })
            //     if(!data[key].hasOwnProperty('alias')  || !data[key].hasOwnProperty('compiler')) return

            //         if(aliasProps.hasOwnProperty(data[key].alias)){
            //             console.log('Duplicate AliasClassName property@'+key+':'+data[key].alias);
            //             console.log(` Alias class name '${data[key].alias}'  of '${key}' is already used by '${aliasProps[data[key].alias].property}'`);
            //             return;
            //         }else if(typeof data[key].compiler !== 'function'){
            //             console.log('Alias ClassName object not created as there is no compiler:'+key+'=>alias:'+data[key].alias)
            //             return
            //         }
            //         aliasProps[data[key].alias]=data[key];
            //         aliasProps[data[key].alias].property=key;
            // })
            return aliasProps;
        },
        //Extract property from given className and return obj and property
        extractProperty(classNameOld:string, data:{[key:string]:Property}){
            //we just need parts before '--' if there is any;
            const className=classNameOld.split('--')[0];
            const extractPossiblePropertyPortion = className.match(/^[a-z-]+/);

            // Not a valid Aliascss class name
            if (!extractPossiblePropertyPortion) return[ null, null];

            let propertyPortion = extractPossiblePropertyPortion[0]
            .replace(/-$/, '') // remove last "-"
            .trim();

            let propertyHolder: {}| null = null;

            // try to match whole portion with property alias
            //  From higher to lower i.e border-right-color.......border-right.....border
            if (data.hasOwnProperty(propertyPortion)) {
                propertyHolder = data[propertyPortion];
            //  console.log(className,0);
            } else {
            // remove  last -[a-z]+ and try again un till ^[a-z]+ means we are at begin ing
                while (/[-][a-z]+$/.test(propertyPortion)) {
                    propertyPortion = propertyPortion.replace(/[-][a-z]+$/, '');
                    if (data.hasOwnProperty(propertyPortion)) {
                         propertyHolder = data[propertyPortion];
                    break;
                    }
                }
            }
            return [propertyHolder,propertyPortion];
        },
        // generate Static Class Names out of give Property Objects
        generateStaticClassNames(data:{[key:string]:Property},global:[]){
            let staticClassNames:{[key:string]:string}={};
            Object.keys(data).map((key)=>{
                let property=key;
                let hasAlias='';
                if(data[key].hasOwnProperty('property')) property=data[key].property;
                if(data[key].hasOwnProperty('alias')) hasAlias=data[key].alias;
                //global values 'inherit:in'
                global.map((value:string)=>{
                    const split=value.split(':');
                    split.map((val)=>{
                        staticClassNames[key+"-"+val]=property+":"+split[0];
                        if(hasAlias.trim()){
                            if(staticClassNames.hasOwnProperty(hasAlias+"-"+val)){
                                console.log("Duplicate Static-Class-Name:",hasAlias+"-"+val);
                            }else{
                                staticClassNames[hasAlias+"-"+val]=property+":"+split[0]; 
                            }
                        }
                    })   
                })
                //for local values
                if(data[key].hasOwnProperty('values') && Array.isArray(data[key].values)){
                    data[key].values.map((value:string)=>{
                    const split=value.split(':');
                    split.map((val)=>{
                        staticClassNames[key+"-"+val]=property+":"+split[0];
                        if(hasAlias.trim()){
                            if(staticClassNames.hasOwnProperty(hasAlias+"-"+val)){
                                console.log("Duplicate Static-Class-Name:",hasAlias+"-"+val);
                            }else{
                                staticClassNames[hasAlias+"-"+val]=property+":"+split[0]; 
                            }
                        }
                    })   
                })
                }
                
            })

            return staticClassNames;
        },

    }
}