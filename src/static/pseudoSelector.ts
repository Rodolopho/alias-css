import config from '../config.js'
  const fullFlagsMatch=/^--(after-hover|after|before-hover|before|checked|default|disabled|empty|enabled|first-child|first-letter|first-line|first-of-type|focus-within|focus-visible|focus|hover-after|hover-before|hover-target|hover|in-range|indeterminate|invalid|lang-|last-child|last-of-type|link|only-child|only-of-type|optional|out-of-range|placeholder|read-only|read-write|required|scrollbar-thumb|scrollbar-track|scrollbar|selection|target|valid|visited|web-kit-scrollbar-thumb|webkit-scrollbar-track|webkit-scrollbar|active)(?=[-|_])/ 
  


const flags :{[key:string]:string}=config.targets;

const matchAndCall: { [key: string]: { match: RegExp; callFunction: any } } = {
  pseudoFullFlag: {
    match:fullFlagsMatch,
      // /(^--(?!n)[a-z0-9]+(-child|-scrollbar|-scrollbar-thumb|-scrollbar-track|-of-range|-of-type|-before|-after|-hover|-letter|-line|-range|-target|-only|-write)?)(?=[-|_])/,
    callFunction: pseudoFullFlag,
  },
  pseudoNot: {
    match: /(^--not-([a-z0-9]+)(?=[-|_]))/,
    callFunction: pseudoHandlerNot,
  },
  pseudoNthChild: {
    match: /(^--nth(-child-|-last-child-|-last-of-type|-of-type-))([0-9]+[n]?)(?=[-|_])/,
    callFunction: pseudoHandlerNthChild,
  },
  pseudoShortNth: {
    match: /^(-(n|nc|nlc|nlot|not)-)([a-z0-9]+)(?=[-|_])/,
    callFunction: pseudoShortNth,
  },
  pseudoShort: {
    match:
      /^(-(a|af|sb|stm|st|afh|bf|bfh|ch|de|di|em|en|fc|fl|fln|fot|fo|fv|fw|h|haf|abf|htg|ir|ind|inv|lc|lot|ln|oot|oc|oor|ph|ro|rw|r|rt|s|tg|v|vi))(?=[-|_])/,
    callFunction: pseudoShort,
  },
};

function pseudoFullFlag(className: string) {
  const alias = className.match(matchAndCall.pseudoFullFlag.match);
  if (alias) {
    if (flags.hasOwnProperty(alias[0])) {
      className = className.replace(alias[0], '');
      return [className, flags[alias[0]]];
    }
  }

  return [className, ''];
}
function pseudoHandlerNthChild(className: string) {
  let pseudo = '';
  const m = className.match(matchAndCall.pseudoNthChild.match);
  if (!m) return [className, pseudo];
  const alias = m[1];
  const classNamePre = m[0];
  const n = m[3];

  if (flags.hasOwnProperty(alias)) {
    pseudo = flags[alias] + '(' + n + ')';
    className = className.replace(classNamePre, '');
  }

  return  [className, pseudo];
}
function pseudoHandlerNot(className: string) {
  const alias = className.match(matchAndCall.pseudoNot.match);
  const match = className.match(matchAndCall.pseudoNot.match);

  if (!match) return [className, ''];
  const pseudo = ':not(' + match[2] + ')';

  if (!alias) return [className, pseudo];
  className = className.replace(alias[0], '');

  return [className, pseudo];
}
function pseudoShortNth(className: string) {
  const match = className.match(matchAndCall.pseudoShortNth.match);
  if (match && flags.hasOwnProperty(match[1])) {
    return [className.replace(match[0], ''), flags[match[1]] + '(' + match[3] + ')'];
  }

  return [className, ''];
}
function pseudoShort(className: string) {
  const match = className.match(matchAndCall.pseudoShort.match);
  if (match && flags.hasOwnProperty(match[1])) {
    return [className.replace(match[0], ''), flags[match[1]]];
  }

  return [className, ''];
}
function elementHandler(className: string) {
  const match = className.match(matchAndCall.element.match);
  if (match) {
    const alias = match[0];
    if (alias) {
      const elfy = alias
        .replace(/____/g, ' ~ ')
        .replace(/___/g, ' + ')
        .replace(/__/g, ' > ')
        .replace(/_/g, '  ')
        .replace(/[\s]all/, ' * ')
        .replace(/[\s]([A-Z])/g, (e, a) => {
          return ' .' + a.toLowerCase();
        })
        .trim();

      return [className.replace(alias, ''), ' ' + elfy];
    }
  }

  return [className, ''];
}

//  ---------------while-Match---

export default function pseudoSelector(className: string) {
    let before='';
    let match=false;
    for (const key in matchAndCall) {
      if (className.match(matchAndCall[key].match)) {
        // console.log(key);
        const result = matchAndCall[key].callFunction(className);
        className = result[0];
        before = result[1];
        match=true;
        break;
      }
    }
    //  console.log(match);
  

  return match?[className, before]:null;
}
