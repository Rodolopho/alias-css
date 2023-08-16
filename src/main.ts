
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
  useColon:true,// class:className="valid-ACSS-class-names"
  globPattern:'',//Use this to check valid new created file to add to watch during watch.on
  customGroupStatement: '',
  customStatement: '',
  useFilename:'',
  compileFileByFile: false,
 
  config(configFile: { [key: string]: any }) {
    if (configFile.hasOwnProperty('input')) {
      this.input = configFile.input;
      this.globPattern=configFile.input;
    }

    if(configFile.hasOwnProperty('extend') && typeof configFile.extend === 'object'){

      let filteredObj:{[key:string]:{}}={};

      Object.keys(configFile.extend).map((key)=>{
          if (configFile.extend[key].hasOwnProperty('compiler') && (typeof configFile.extend[key].compiler === 'function')){
            filteredObj[key]=configFile.extend[key];
          }
      })
      statementMaker.extend(filteredObj);
      
    }

    if(configFile.hasOwnProperty('useColon')){
        this.useColon=configFile.useColon;
    }

    if (configFile.hasOwnProperty('output')) {
      const op=configFile.output;
      if(op.hasOwnProperty('location')){
        this.output = op.location;
      }
      if(op.hasOwnProperty('--file') && op['--file']===true ){
        this.compileFileByFile=true;
      }
      
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
  matchRegExp:/(?:(class|className|class[-_][\w-]+))=(?:["']\W+\s*(?:\w+)\()?["']([^'"]+)['"]/,
  matchRegExpWithColon:/(?:(class|className|class[-_:][\w-]+))=(?:["']\W+\s*(?:\w+)\()?["']([^'"]+)['"]/,

  // it will hold all the class name list that had been already compiled
  classList: [],
  // it hold he group and their classnames
  groups: {},
  // compiles and return statement i.e .class{property:value}
  statementMaker,
  // initialized input and out put

  //    -----------------------------Core Functions
  //  extract classnames and associated group if available return [[classnamesList],{group}] where group 'groupname':'classnames
  extractClassName(file: string) {
   const data = fs.readFileSync(file, 'utf-8');
        const classList:string[] = [];
        const groups :{[key:string]:any}= {};
        const matchRegExp=this.useColon?this.matchRegExpWithColon:this.matchRegExp;
       
        // step 1: find class="" acss-group=""
       const matches= data.match(new RegExp(matchRegExp,"g"));
            if(matches===null)return [[], {}]
            
        matches.forEach((match) => {
            const extraction = match.match(matchRegExp);
            if(!extraction) return;

            // case one if its just class-group
            if(extraction[1].match(/class[:_-]/)){
                const group=extraction[1].replace(/class[:_-]/,'');
                if (group) {
                    // if group already exists
                    // if (groups.hasOwnProperty(group) && groups[group] === extraction[2]) {
                    if (groups.hasOwnProperty(group)){
                       groups[group] = groups[group] +" "+ extraction[2];
                    }
                    else {
                        // new group
                        groups[group] = extraction[2].trim().replace(/[\s]+/," ");
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
            
            
        return [classList, groups];
  },
  // --------------Main----------------------
  // compiles given file and return css statement
  compile(file: File) {
    let compileStatement = '';
    let globalStatement = '';
    const [classList, groups] = this.extractClassName(file);

    if (classList.length) {
      //  compileStatement=`\n/* AliasCSS : These are classnames compiled  from ${path.basename(file)}*/\n\n`,
      classList.forEach((e: string) => {
        const statement = this.statementMaker.make(e);
        if (statement) {
          console.log('\x1b[32m', statement);
          if (this.classList.indexOf(e) === -1) {
            globalStatement += statement + '\n';
            this.classList.push(e);
            //console.log(e);
          }
          compileStatement += statement + '\n';
        }
      });
    }
    for (const key in groups) {
      if (groups.hasOwnProperty(key)) {
        const gpStatement = this.statementMaker.group(groups[key], key);
        if (!this.groups.hasOwnProperty(key)) {
          this.groups[key] = groups[key];
          globalStatement += gpStatement + '\n';
        }
        compileStatement += gpStatement + '\n';
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
  }, // EORUN
  //    ----------------WATCH-------------------------------
  watch(){
    const watcher = chokidar.watch(this.input, {
      ignored: '*.css', // ignore dotfiles
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
