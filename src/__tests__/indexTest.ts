import {styleJSX} from '../index';

test('index Group for JSX test',()=>{
    expect(styleJSX('display-flex')).toEqual({display:'flex'})
})