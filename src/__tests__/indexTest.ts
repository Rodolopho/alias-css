import {styleJSX} from '../index';

test('index Group for JSX test',()=>{
    expect(styleJSX('display-flex color-red')).toEqual({display:'flex', "color":"red"})
})