import {compiler} from '../mainCompiler'
test('MainCompiler with attribute Selector compiler.make()', () => {
  expect(compiler.make('[data-state=open]background-color-primary700')).toEqual('.\\[data-state\\=open\\]background-color-primary700[data-state="open"]{background-color:#6941C6}');
});
test('MainCompiler with .className Selector compiler.make()', () => {
  expect(compiler.make('xs_.class-[data-state=open]background-color-primary700')).toEqual('@media (max-width : 576px){.xs_\\.class-\\[data-state\\=open\\]background-color-primary700 .class[data-state="open"]{background-color:#6941C6}}');
});
test('MainCompiler compiler.make()', () => {
  expect(compiler.make('background-color-primary700')).toEqual('.background-color-primary700{background-color:#6941C6}');
});
test('MainCompiler compiler.group)', () => {
  expect(compiler.group('background-color-red c-initial','bg')).toBe('.bg{background-color:red} \n.bg{color:initial} \n');
});
test('MainCompiler compiler.extend)', () => {
    compiler.prebuild("bgc-one","background-color:blue")
  expect(compiler.make('-h-bgc-one-i')).toEqual('.-h-bgc-one-i:hover{background-color:blue !important}');
});
test('MainCompiler compiler.extend)', () => {
    compiler.extend("bgc-one","background-color:blue")
  expect(compiler.make('-nc-2-bgc-one-i')).toEqual('.-nc-2-bgc-one-i:nth-child(2){background-color:blue !important}');
});
test('MainCompiler with .className Selector compiler.make()', () => {
  compiler.addMedia({prefix:{'xs':'@media (max-width : 600px)'}})
  expect(compiler.make('xs_.class-[data-state=open]background-color-primary700')).toEqual('@media (max-width : 600px){.xs_\\.class-\\[data-state\\=open\\]background-color-primary700 .class[data-state="open"]{background-color:#6941C6}}');
});

// test('Group For JS',()=>{
//   expect(compiler.groupForJs('df f1 fw-4')).toBe({});
// })
