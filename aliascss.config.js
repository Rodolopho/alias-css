export  const config={
    input:['public/**/*.html'],
    output:{
        location:'public/style/acss.css',
        "--file":true
    },
    extend:{
        'font-size':{
            alias:'fs',
            values:["2rem:xl"],
            compiler:(value)=>{
                return value;
            }
        },
        'shadow':{
            property:'box-shadow',
            compiler:(value)=>{
                value=value.slice(1);
                const values={
                    '3xl': ' 0px 32px 64px -12px var(--shadow-color)',
                    'xxxl': ' 0px 32px 64px -12px var(--shadow-color)',
                    '2xl': ' 0px 24px 48px -12px var(--shadow-color)',
                    'xxl': ' 0px 24px 48px -12px var(--shadow-color)',
                    'xl': ' 0px 20px 24px -4px var(--shadow-color)',
                    'lg': ' 0px 12px 16px -4px var(--shadow-color)',
                    'md': ' 0px 4px 8px -2px var(--shadow-color)',
                    'sm': ' 0px 1px 3px var(--shadow-color)',
                    'xs': ' 0px 1px 2px var(--shadow-color)',
                };
                if(values.hasOwnProperty(value)) return values[value];
            }
         
        }
    },
    statement:`
        body{
            background:olive;
        }
    `,
    
    custom:{
        color:{
            white:'#e3e3e3',
            'whiter':'#f3f3f3',
            whitest:'#ffffff'
        }
    },
    prebuild:{
        'bg-reddish':'background:red',
        'flex-center':'display:flex;align-items:center;justify-content:center',
    }

    
}