 const selector:{
    [key:string]:any,
    target:
        {
            [key:string]:string
        }
    }= {
    test: /(^--(?!n)[a-z0-9]+(-child|-webkit-scrollbar|-webkit-scrollbar-thumb|-webkit-scrollbar-track|-scrollbar|-scrollbar-thumb|-scrollbar-track|-of-range|-of-type|-before|-after|-hover|-letter|-line|-range|-target|-only|-write)?)(?=[-|_])/,
    testAlias:/^(-(a|af|sb|stm|st|afh|bf|bfh|ch|de|di|em|en|fc|fl|fln|fot|fo|h|haf|abf|htg|ir|ind|inv|lc|lot|ln|oot|oc|oor|ph|ro|rw|r|rt|s|tg|v|vi))(?=[-|_])/,
    target:{
  '--active': ':active', // -a
  '-a': ':active',

  '--after': '::after', // -af
  '-af': '::after', // -af

  '--after-hover': '::after:hover',
  '-afh': '::after:hover',

  '--before': '::before', // -bf
  '-bf': '::before', // -bf

  '--before-hover': '::before:hover', // -bfh
  '-bfh': '::before:hover', // -bfh

  '--checked': ':checked', // -ck
  '-ch': ':checked', // -ck

  '--default': ':default', // -df
  '-de': ':default', // -df

  '--disabled': ':disabled', // -ds
  '-di': ':disabled', // -ds

  '--empty': ':empty', // -em
  '-em': ':empty', // -em

  '--enabled': ':enabled', // -en
  '-en': ':enabled', // -en

  '--first-child': ':first-child', // -fc
  '-fc': ':first-child',

  '--first-letter': '::first-letter', // -f
  '-fl': '::first-letter', // -fl

  '--first-line': '::first-line', // -fln
  '-fln': '::first-line', // -fln

  '--first-of-type': ':first-of-type', // -fot
  '-fot': ':first-of-type',

  '--focus': ':focus', // -fo
  '-fo': ':focus', // -fo

  '--hover': ':hover', // -h
  '-h': ':hover', // -h

  '--hover-after': ':hover::after', // -haf
  '-haf': ':hover::after', // -haf

  '--hover-before': ':hover::before', // -hbf
  '-hbf': ':hover::before', // -hbf

  '--hover-target': ':hover:target', // -htg
  '-htg': ':hover:target', // -htg

  '--in-range': ':in-range', // -ir
  '-ir': ':in-range', // -ir

  '--indeterminate': ':indeterminate', // idt
  '-ind': ':indeterminate', // idt

  '--invalid': ':invalid', // -in
  '-inv': ':invalid', // -in

  '--lang-': ':lang(language)', // -ln
  '-lan-': ':lang(language)', // -ln

  '--last-child': ':last-child', // -lc
  '-lc': ':last-child', // -lc

  '--last-of-type': ':last-of-type', // -lot
  '-lot': ':last-of-type', // -lot

  '--link': ':link', // -l
  '-ln': ':link', // -l

  '--not-': ':not', // -n-
  '-n-': ':not', // -n-

  '--nth-child-': ':nth-child', // 	-nc2n
  '-nc-': ':nth-child', // 	-nc2n

  '--nth-last-child-': ':nth-last-child', // -nlc2n
  '-nlc-': ':nth-last-child', // -nlc2n

  '--nth-last-of-type-': ':nth-last-of-type', // -nlot2n
  '-nlot-': ':nth-last-of-type', // -nlot2n

  '--nth-of-type-': ':nth-of-type', // -not
  '-not-': ':nth-of-type', // -not

  '--only-of-type': ':only-of-type', // -oot
  '-oot': ':only-of-type', // -oot

  '--only-child': ':only-child', // -oc
  '-oc': ':only-child', // -oc

  '--optional': ':optional', // -o
  '-op': ':optional', // -o

  '--out-of-range': ':out-of-range', // -oor
  '-oor': ':out-of-range', // -oor

  '--placeholder': '::placeholder', // -ph
  '-ph': '::placeholder', // -ph

  '--read-only': ':read-only', // -ro

  '-ro': ':read-only', // -ro

  '--read-write': ':read-write', // -rw
  '-rw': ':read-write', // -rw

  '--required': ':required', // -rq
  '-rq': ':required', // -rq

  '--root': ':root', // -rt
  '-rt': ':root', // -rt

  '--selection': '::selection', // -sl
  '-s': '::selection', // -sl

  '--scrollbar': '::-webkit-scrollbar',
  '--webkit-scrollbar': '::-webkit-scrollbar',
  '-sb': '::-webkit-scrollbar',
  '--scrollbar-track': '::-webkit-scrollbar-track',
  '--webkit-scrollbar-track': '::-webkit-scrollbar-track',
  '-st': '::-webkit-scrollbar-track',
  '--scrollbar-thumb': '::-webkit-scrollbar-thumb',
  '--web-kit-scrollbar-thumb': '::-webkit-scrollbar-thumb',
  '-stm': '::-webkit-scrollbar-thumb',

  '--target': ':target', // -tg
  '-tg': ':target', // -tg

  '--valid': ':valid', // -vl
  '-v': ':valid', // -vl

  '--visited': ':visited', // -vi
  '-vi': ':visited', // -vi
    },
}

export default selector;