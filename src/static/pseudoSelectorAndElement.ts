// import pseudoSelector from './selector.js'
import pseudoSelector from './pseudoSelector.js'
import elementSelector from './element.js'
import attribute from './attributeSelector.js';

    export default function(className:string){
        let workingClassName=className;
        let result='';
        let match=false;
        do {
            const matched=pseudoSelector(workingClassName);
            if(matched){
                workingClassName=matched[0];
                result +=matched[1];
                match=true;

            }else if(elementSelector.test.test(workingClassName)){
                const [replacedClassName, selector]=elementSelector.process(workingClassName);
                result += selector;
                workingClassName=replacedClassName;
                match=true;
            }else if(attribute.test.test(workingClassName)){
                const [replacedClassName, selector]=attribute.process(workingClassName);
                result += selector;
                workingClassName=replacedClassName;
                match=true;
            }else{
                match=false;
            }
            
        } while (match);

        return [result, workingClassName]

        // if(pseudoSelector.test.test(workingClassName)){
        //     const [pseudoProperty] :any =workingClassName.match(pseudoSelector.test)?workingClassName.match(pseudoSelector.test):[null];
        //     if(pseudoProperty){
        //          result += pseudoSelector.target[pseudoProperty];
        //         workingClassName=workingClassName.replace(pseudoProperty,'');
                
        //     }
        //     match=true;
        // }else if(pseudoSelector.testAlias.test(workingClassName)){
        //     const [pseudoProperty] :any =workingClassName.match(pseudoSelector.testAlias)?workingClassName.match(pseudoSelector.testAlias):[null];
        //     if(pseudoProperty){
        //         result += pseudoSelector.target[pseudoProperty];
        //         workingClassName=workingClassName.replace(pseudoProperty,'');
                
        //     }
        //     match=true;
        // }else if(elementSelector.test.test(workingClassName)){
        //         const [replacedClassName, selector]=elementSelector.process(workingClassName);
        //         result += selector;
        //         workingClassName=replacedClassName;
        //         match=true;
        // }else{
        //     match=false;
        // }
    
    //     while(match){
    //         if(pseudoSelector.test.test(workingClassName)){
    //             const [pseudoProperty] :any =workingClassName.match(pseudoSelector.test)?workingClassName.match(pseudoSelector.test):[null];
    //             if(pseudoProperty){
    //             result+=pseudoSelector.target[pseudoProperty];
    //                 workingClassName=workingClassName.replace(pseudoProperty,'');
                    
    //             }
    //             match=true;
    //         }else if(pseudoSelector.testAlias.test(workingClassName)){
    //             const [pseudoProperty] :any =workingClassName.match(pseudoSelector.testAlias)?workingClassName.match(pseudoSelector.testAlias):[null];
    //                 if(pseudoProperty){
    //                     result+=pseudoSelector.target[pseudoProperty];
    //                     workingClassName=workingClassName.replace(pseudoProperty,'');
                       
    //             }
    //             match=true;
    //         }else if(elementSelector.test.test(workingClassName)){
    //                 const [replacedClassName, selector]=elementSelector.process(workingClassName);
    //                 result += selector;
    //                 workingClassName=replacedClassName;
    //                 match=true;
    //         }else{
    //             match=false;
    //         }
    // }

    // return [result, workingClassName]
}
