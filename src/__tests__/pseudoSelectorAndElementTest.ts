import pseudoAndElement from '../static/pseudoSelectorAndElement'

test('attribute selector', () => {
  expect(pseudoAndElement('[data-state=open]-c-red')).toEqual(['[data-state="open"]', '-c-red']);
  expect(pseudoAndElement('_Class-[data-state=open]-c-red')).toEqual([' .class[data-state="open"]', '-c-red']);
  expect(pseudoAndElement('_Class-[data-state=open]-c-red')).toEqual([' .class[data-state="open"]', '-c-red']);
});
test('Pseudo and Element  ', () => {
  expect(pseudoAndElement('_div__p-bn')).toEqual([' div > p', '-bn']);
});
test('Pseudo and Element  ', () => {
  expect(pseudoAndElement('_div__p-h-bn')).toEqual([' div > p:hover','-bn']);
});
test('Pseudo and Element  ', () => {
  expect(pseudoAndElement('--hover_div__p-h-bn')).toEqual([':hover div > p:hover','-bn']);
});
test('Pseudo and Element  ', () => {
  expect(pseudoAndElement('--hover_div__p-h_next_all--focus-bn')).toEqual([':hover div > p:hover + *:focus','-bn']);
});

test('Pseudo and Element :nth ', () => {
  expect(pseudoAndElement('--nth-child-2n_div__p-h_next_all--focus-bn')).toEqual([':nth-child(2n) div > p:hover + *:focus','-bn']);
});