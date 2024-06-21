import attribute from '../static/attributeSelector'

test('Attribute Selector  ', () => {
  expect(attribute.process('[data-state=open]-bn')).toEqual(['-bn','[data-state="open"]']);
});
test('Attribute Selector  ', () => {
  expect(attribute.process('-[data-state=open]-bn')).toEqual(['-bn','[data-state="open"]']);
});
test('Attribute Selector  ', () => {
  expect(attribute.process('-[data-state~=open]-bn')).toEqual(['-bn','[data-state~="open"]']);
});
test('Attribute Selector  ', () => {
  expect(attribute.process('-[href=https://example.com]-bn')).toEqual(['-bn','[href="https://example.com"]']);
});