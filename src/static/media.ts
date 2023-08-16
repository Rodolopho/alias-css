const  media :{
    [key:string]:any,
    target:
    {[key:string]:string
    }
}
    =  {
    test:/^(print|xs|sm|md|lg|xl|xxl|-sm|-md|-lg|-xl|-xxl)(?=[-|_])/,
    target:{
         print: '@media print',
        xs: '@media (max-width : 576px)',
        sm: '@media (min-width : 576px)',
        md: '@media (min-width : 768px)',
        lg: '@media (min-width : 992px)',
        xl: '@media (min-width : 1200px)',
        xxl: '@media (min-width : 1408px)',
        '-sm': '@media (max-width : 576px)',
        '-md': '@media (max-width : 768px)',
        '-lg': '@media (max-width : 992px)',
        '-xl': '@media (max-width : 1200px)',
        '-xxl': '@media (max-width : 1408px)',
    },

}

export default media;