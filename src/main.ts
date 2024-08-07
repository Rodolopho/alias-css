
import { compiler as statementMaker} from './mainCompiler.js';
import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';

type Index = {
  [key: string]: any;
  groups: { [key: string]: string };
  classList: string[];
};

//  export let aliascss Browser=statementMaker;
const AliasCSS: Index = {
  input: null,
  output: null,
  ignore: [],
  useExtractorFunction:null,
  useColon:true,// class:className="valid-ACSS-class-names"
  globPattern:'',// Use this to check valid new created file to add to watch during watch.on
  customGroupStatement: '',
  customStatement: '',
  useFilename:'',
  compileFileByFile: false,

  matchExtractorFunction:null,

  // createExtractorRegex:(fname:string)=>new RegExp(fname + "[\\s*]?(`|\\(["+`"'])`+ "(.+)" + "(`|" + `["']` + "\\))"),
  createExtractorRegex:(fname:string)=>new RegExp(fname + "[\\s*]?(`|\\(["+`"'])`+ "([^)`]+)" + "(`|" + `["']` + "\\))"),


  matchRegExp:/(?:(class|className|class[-_][\w-\[\]=_]+))=[\s*]?(?:["']\W+\s*(?:\w+)\()?["']([^'"]+)['"]/,
  matchRegExpWithColon:/(?:(class|className|class[-_:][\w-\[\]=_]+))=[\s*]?(?:["']\W+\s*(?:\w+)\()?["']([^'"]+)['"]/,

  matchRegExpKeyFrame:/[\s](?:(keyframes[-_][\w-]+))=[\s*]?(?:["']\W+\s*(?:\w+)\()?["']([^'"]+)['"]/,
  matchRegExpWithColonKeyFrame:/[\s](?:(keyframes[-_:][\w-]+))=[\s*]?(?:["']\W+\s*(?:\w+)\()?["']([^'"]+)['"]/,
 // -----------input--------------------
  config(configFile: { [key: string]: any }) {
    if (configFile.hasOwnProperty('input')) {
      this.input = configFile.input;
      this.globPattern=configFile.input;
    }
    // ------------Extractor function-------
    if (configFile.hasOwnProperty('extractorFunction')) {
      this.useExtractorFunction = configFile.extractorFunction.trim();
      if(this.useExtractorFunction) this.matchExtractorFunction=this.createExtractorRegex(this.useExtractorFunction);

    }
    // ---------Extend----------------
    if(configFile.hasOwnProperty('extend') && typeof configFile.extend === 'object'){

      const filteredObj:{[key:string]:{}}={};

      Object.keys(configFile.extend).map((key)=>{
          if (configFile.extend[key].hasOwnProperty('compiler') && (typeof configFile.extend[key].compiler === 'function')){
            filteredObj[key]=configFile.extend[key];
          }
      })
      statementMaker.extend(filteredObj);
      
    }
// -----------------useColon----------------------------
    if(configFile.hasOwnProperty('useColon')){
        this.useColon=configFile.useColon;
    }
// ----------------output-------------------
    if (configFile.hasOwnProperty('output')) {
      const op=configFile.output;
      if(op.hasOwnProperty('location')){
        this.output = op.location;
      }
      if(op.hasOwnProperty('--file') && op['--file']===true ){
        this.compileFileByFile=true;
      }
      
    }
    // ---------------addMedia----------------
    if (configFile.hasOwnProperty('media') && typeof configFile.media === 'object') {
      this.statementMaker.addMedia(configFile.media);
    }
    //  /Truncate File every time we bundle
    if (configFile.hasOwnProperty('truncate') && configFile.truncate === false) {
      // do nothing
    } else {
      fs.truncateSync(path.resolve(this.output));
    }
    // Custom CSS statement
    if (configFile.hasOwnProperty('statement')) {
      this.customStatement = configFile.statement;
      this.writeStatementToFile(configFile.statement);
    }
    // Custom Groups bundling acss classnames in single class name
    if (configFile.hasOwnProperty('group')) {
      this.customGroupStatement = this.statementMaker.groupObj(configFile.group);
      if (this.customGroupStatement) this.writeStatementToFile(this.customGroupStatement);
    }
    // Adding Custom color, length etc
    if (configFile.hasOwnProperty('custom') && typeof configFile.custom === 'object') {
      Object.keys(configFile.custom).forEach((key) => {
        this.statementMaker.addCustom(key, configFile.custom[key]);
      });
    }
    // Extend custom class name define {'border-color-native":'border-color: skyBlue',}
    if (configFile.hasOwnProperty('prebuild')) {
      this.statementMaker.prebuild(configFile.prebuild);
    }

    // Ignore these class name
    if (configFile.hasOwnProperty('ignore')) {
      if (Array.isArray(configFile.ignore)) {
        configFile.ignore.forEach((each: string) => this.ignore.push(each.trim()));
      }
    }
  },

  // extract class="dn fs12pc" and class-group="df fs12px" acss-group or className=""
  

  // it will hold all the class name list that had been already compiled
  classList: [],
  // it hold he group and their classnames
  groups: {},
  keyframe:{},
  // compiles and return statement i.e .class{property:value}
  statementMaker,
  // initialized input and out put

  //    -----------------------------Core Functions
  //  extract classnames and associated group if available return [[classnamesList],{group}] where group 'groupname':'classnames
  extractClassName(file: string) {
   const data = fs.readFileSync(file, 'utf-8');
        const classList:string[] = [];
        const groups :{[key:string]:any}= {};
        const keyframe:{[key:string]:any}= {};
        const matchRegExp=this.useColon?this.matchRegExpWithColon:this.matchRegExp;
        const matchRegExpKeyFrame=this.useColon?this.matchRegExpWithColonKeyFrame:this.matchRegExpKeyFrame;
       
        // step 1: find class=""
       const matches= data.match(new RegExp(matchRegExp,"g"));
          if(matches!==null){
            
        matches.forEach((match) => {
            const extraction = match.match(matchRegExp);
            if(!extraction) return;

            // case 2  if its just class-group
            if(extraction[1].match(/class[:_-]/)){
                let group=extraction[1].replace(/class[:_-]/,'');
                let classExtracted=extraction[2];
                if (group) {
                  const match=group.match(/\[(.)+\]/);
                  if(match){
                    group=group.replace(match[0],'');
                    classExtracted=classExtracted.trim().split(/\s+/).map(e=>match[0].replace(/^\[/,'').replace(/\]$/,'')+(/^[_-]/.test(e)?'':'-')+e).join(" ");  
                  }
                  // if(group.match())
                    // if group already exists
                    // if (groups.hasOwnProperty(group) && groups[group] === extraction[2]) {
                    if (groups.hasOwnProperty(group)){
                       groups[group] = groups[group] +" "+ classExtracted;
                    }
                    else {
                        // new group
                        groups[group] = classExtracted.trim().replace(/[\s]+/," ");
                          }

                  }
                  }else{
                        extraction[2].trim().replace(/[\s]+/," ").split(/\s+/).forEach((e) => {
                                if (this.ignore.indexOf(e) === -1 && classList.indexOf(e) === -1) {
                                    classList.push(e);
                                }
                            });
                    }
                })
              }
              // -----------Extraction Function-------------
              // console.log('extraction', this.useExtractorFunction)
              const matchesEF=data.match(new RegExp(this.matchExtractorFunction,"g"))
                if(matchesEF){
                  matchesEF.forEach((each)=>{
                    const extraction=each.match(this.matchExtractorFunction);
                    if(extraction && extraction[2]){
                      extraction[2].trim().replace(/[\s]+/," ").split(/\s+/).forEach((e) => {
                                if (this.ignore.indexOf(e) === -1 && classList.indexOf(e) === -1) {
                                    classList.push(e);
                                }
                            });

                    }
                  })
                }


              // ----------End-Extraction Function-------------
                // /---------keyframes
              const matchesKF= data.match(new RegExp(matchRegExpKeyFrame,"g"));
            if(matchesKF===null)return [classList, groups,keyframe]
            
        matchesKF.forEach((match) => {
            const extraction = match.match(matchRegExpKeyFrame);
            if(!extraction) return;

            // case one if its just keyframes
            if(extraction[1].match(/keyframes[:_-]/)){
                const name=extraction[1].replace(/keyframes[:_-]/,'');
                if (name) {
                    // if name already exists
                    // if (names.hasOwnProperty(name) && names[name] === extraction[2]) {
                    if (keyframe.hasOwnProperty(name)){
                       keyframe[name] = keyframe[name] +" "+ extraction[2].trim().replace(/[\s]+/," ");
                    }
                    else {
                        // new name
                        keyframe[name] = extraction[2].trim().replace(/[\s]+/," ");
                          }

                  }
                  }
                })
                // /--------end-of-keyframes
            
            
        return [classList, groups,keyframe];
  },
  // --------------Main----------------------
  // compiles given file and return css statement
  compile(file: File) {
    let compileStatement = '';
    let globalStatement = '';
    const [classList, groups,keyframe] = this.extractClassName(file);

    // Process ClassList
    if (classList.length) {
      //  compileStatement=`\n/* AliasCSS : These are classnames compiled  from ${path.basename(file)}*/\n\n`,
      classList.forEach((e: string) => {
        const statement = this.statementMaker.make(e);
        if (statement) {
          console.log('\x1b[32m', statement);
          if (this.classList.indexOf(e) === -1) {
            globalStatement += statement + '\n';
            this.classList.push(e);
            // console.log(e);
          }
          compileStatement += statement + '\n';
        }
      });
    }
    // Process Groups
    for (const key in groups) {
      if(groups.hasOwnProperty(key)){
        const gpStatement = this.statementMaker.group(groups[key], key);
        if (!this.groups.hasOwnProperty(key)) {
          this.groups[key] = groups[key];
          globalStatement += gpStatement + '\n';
        }
        compileStatement += gpStatement + '\n';
      }
    }

    // Process Keyframes
      // Keyframes
      for (const key in keyframe) {
      if (keyframe.hasOwnProperty(key)) {
        let kfStatement='@keyframes '+ key +"{\n";
        const split=keyframe[key].split(/\s+/);
        split.forEach((each:string) => {
          
          // case 1-> @100-acss
          // case 2->@10:20:30-acss
          // case 3->@[10,20,30]-acss
          try {
            const[at,pNv]=each.replace("-","=").split("=");
            kfStatement+=` ${at.replace('@','').replace(/:/g,',').replace(/,/g,"%,").replace(/[\[|\]]/g,'')}% {${this.statementMaker.make(pNv,null,true)}}`    
          } catch (error) {
            console.error('Not a valid entry for AliasCSS keyframes processor : '+each, error)
          }
          
        });
        // push keyframes to global scope if there is no other with the same animation name
        if (!this.keyframe.hasOwnProperty(key)) {
          this.keyframe[key] = keyframe[key];
          globalStatement += kfStatement + '\n}\n';
        }
        compileStatement += kfStatement + '\n}\n';
      }
    }
    
    return [compileStatement, globalStatement];
  },
  // ----------------------------------------------------------
  // Process Folder if input is folder
  processFolder(folder: string) {
    const files = fs.readdirSync(folder);

    files.forEach((file) => {
      const filepath = path.join(folder, file);

      fs.stat(filepath, (err, stats) => {
        if (err) throw err;
        if (stats.isDirectory()) {
          this.processFolder(filepath);
        } else if (stats.isFile()) {
          this.writeToFile(filepath);
        }
      });
    });
  },
  // ----------------------------------------------------------
  // write css statement to css file
  writeToFile(file: string) {
    const [localStatement, globalStatement] = this.compile(file);

    if (!localStatement) return;

    if (this.compileFileByFile === true) {
      try {
        fs.writeFile(
          path.resolve(file) + '.css',
          this.customStatement + this.customGroupStatement + localStatement,
          (err) => {
            if (err) throw err;
            console.log('AliasCSS compiled', path.basename(file), 'Locally');
          },
        );
      } catch (error) {
        console.log('\x1b[31m', "Couldn't able to append/create locally from " + file);
        console.log(error);
      }
    }

    if (!globalStatement) return;

    try {
      fs.appendFileSync(
        this.output,
        `\n/* AliasCSS : These are classnames compiled  from ${path.basename(file)}*/\n\n` + globalStatement,
      );
      console.log('Successfully  compiled acss from ' + file);
    } catch (err) {
      console.log('\x1b[31m', "Couldn't able to append compiled acss from " + file);
      console.log(err);
    }
  },
  // for config.js file
  writeStatementToFile(content: string) {
    try {
      // ----------append or not------

      fs.appendFileSync(
        this.output,

        content,
      );
      console.log(content);
    } catch (err) {
      console.log('\x1b[31m', "Couldn't able to compile and append aliascss.config.js group attribute ");
      console.log(err);
    }
  },
  //
  // --------------------RUN---------------------
  //
  run(bool: boolean) {
    if (bool === true) this.compileFileByFile = true;

    if (this.input && this.output) {
      this.input = fg.sync(this.input, { dot: true });
      if (this.input.length === 0) {
        console.error('Not a Valid input: No files found with the given input: Please Check your input');
        return;
      }
      // case 1: if its array
      if (Array.isArray(this.input)) {
        this.input.forEach((entry) => {
          fs.stat(entry, (err, stats) => {
            if (err) throw err;

            if (stats.isDirectory()) {
              this.processFolder(entry);
              return;
            }
            if (stats.isFile()) {
              this.writeToFile(entry);
              return;
            }
          });
        });

        return;
      }

      // case @: file or folder
      //  if(fs.existsSync(this.input)) // console.log('file yes');
      fs.stat(this.input, (err, stats) => {
        if (err) throw err;

        if (stats.isDirectory()) {
          this.processFolder(this.input);
          return;
        }
        if (stats.isFile()) {
          this.writeToFile(this.input);
          return;
        }
      });
    } else {
      console.error('\x1b[31m', 'Please provide, entry or/and output file/s');
    }
  }, // End-of-RUN
  //    ----------------WATCH-------------------------------
  watch(){
    const watcher = chokidar.watch(this.input, {
      ignored: '*.css', // ignore dot-files
      persistent: true
    });
      const compileFile=(file:any)=>{
        console.log(`--processing file : ${file}`);
            this.input = file;
            this.run();
           console.log('Done! ');
      }


   // Something to use when events are received.
  const log = console.log.bind(console);
// Add event listeners.
watcher
  .on('add', path => log(`File ${path} has been added to watch`))
  .on('change', path => compileFile(path))
  // .on('unlink', path => log(`File ${path} has been removed`));

// More possible events.
watcher
  .on('addDir', path => log(`Directory ${path} has been added`))
  .on('unlinkDir', path => log(`Directory ${path} has been removed`))
  // .on('error', error => log(`Watcher error: ${error}`))
  // .on('ready', () => log('Initial scan complete. Ready for changes'))
  .on('raw', (event, path, details) => { // internal
    // log('Raw event info:', event, path, details);
    if(event==='created' && details.type==='file'){
      if(this.globPattern){
         const files=fg.sync(this.globPattern,{absolute:true});
         if(files.indexOf(path)!==-1){
            watcher.add(path);
         }
      }else{
        watcher.add(path);
      }
    }
  });

  },

};

export default AliasCSS;
