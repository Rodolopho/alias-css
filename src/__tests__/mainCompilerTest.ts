import {compiler} from '../mainCompiler'
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

// test('Group For JS',()=>{
//   expect(compiler.groupForJs('df f1 fw-4')).toBe({});
// })
