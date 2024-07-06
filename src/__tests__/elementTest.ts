import elementSelector from '../static/element'

test('Element Selector  ', () => {
  expect(elementSelector.process('__div-[data-state=open]-bn')).toEqual(['-[data-state=open]-bn',' > div']);
});
test('Element Selector  ', () => {
  expect(elementSelector.process('__div[data-state=open]-bn')).toEqual(['[data-state=open]-bn',' > div']);
});

test('Element Selector  ', () => {
  expect(elementSelector.process('_div-bn')).toEqual(['-bn',' div']);
});
test('Element Selector  ', () => {
  expect(elementSelector.process('_next_all-bn')).toEqual(['-bn',' + *']);
});
test('Element Selector  ', () => {
  expect(elementSelector.process('_child_p-bn')).toEqual(['-bn',' > p']);
});
test('Element Selector  ', () => {
  expect(elementSelector.process('_siblings_p-bn')).toEqual(['-bn',' ~ p']);
});
test('Element Selector  ', () => {
  expect(elementSelector.process('_siblings_PlayHard-bn')).toEqual(['-bn',' ~ .playHard']);
});
test('Element Selector  ', () => {
  expect(elementSelector.process('_div__p-bn')).toEqual(['-bn',' div > p']);
});