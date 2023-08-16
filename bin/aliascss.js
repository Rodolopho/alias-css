#!/usr/bin/env node
import path from 'path';
import fs from 'fs'
import  AliasCSS  from "../lib/main.js";
import pkg from '../package.json' assert { type: "json" };

export default AliasCSS;

const argSupplied=process.argv;

//Version
if(argSupplied.indexOf('--version')!=-1){
    console.log( 'version' ,pkg.version);
     process.exit();
}
//Initialize args
const watch=argSupplied.indexOf('--watch')==-1?false:true;
const file=argSupplied.indexOf('--file')==-1?false:true;
const isConfigFile=argSupplied.indexOf('--config')==-1?false:true;
const isModule=argSupplied.indexOf('--module')==-1?false:true;
let configFileName='aliascss.config.js';

//Check if it has minimum required arguments
if(!isConfigFile && argSupplied.length<4){
    console.error("Insufficient argument Provided; Required at least [input] and [output] or --config flag");
    process.exit();
} 

//Just checking if there is config file
if(fs.existsSync(path.resolve('aliascss.config.js'))){
     configFileName='aliascss.config.js';
}else if(fs.existsSync(path.resolve('aliascss.config.mjs'))){
    configFileName='aliascss.config.mjs';
}
if(isModule){
    configFileName='aliascss.config.mjs';
}

if(isConfigFile && fs.existsSync(path.resolve(configFileName))){
    let configFile=await import(path.resolve(configFileName));
    //check if it has input and out file
    if(configFile.config.hasOwnProperty('output') && configFile.config.output.location ){
    
        fs.closeSync(fs.openSync(configFile.config.output.location, 'w'));

       if(!fs.existsSync(path.resolve(configFile.config.output.location))){
            console.error('Please check  if output property in aliascss.config.js  has location to the output file');
            process.exit();
       }

        //check for input in config file
        if(!configFile.config.input){
            console.error('No Input to Process : Provide input (glob-pattern) in input property of aliascss.config.js');
            process.exit();
        }

        AliasCSS.config(configFile.config);
        AliasCSS.run(file);
        if(watch) AliasCSS.watch();

 }else{
    console.error('Please check  if there is output property in aliascss.config.js and it has valid path to the output file');
    process.exit();
}

}else if(isConfigFile){
    console.error('Make sure you have aliascss.config.js in your root directory');
    process.exit();
}else{
    let input=argSupplied[2];
    // console.log(argSupplied[2]);
    let output=argSupplied[3];
    if(fs.existsSync(path.resolve(output)) && input){

        AliasCSS.input=input;
        AliasCSS.output=output;
        //Truncate File every time we bundle
        fs.truncateSync(path.resolve( AliasCSS.output));
        
         console.log('AliasCSS is compiling............started')
        AliasCSS.run();
        // console.log(1234)
        if(watch){
             AliasCSS.append=true;
             AliasCSS.watch();
            }

    }else{
        console.error("Provide Valid Input or/and Output path");
        process.exit();
    }
}
//--------------------end of ifelse isConfigFile.......



