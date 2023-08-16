import helper from '../helper'
import cssProps from '../css-properties-all'
import config from '../config'

let helpers=helper();


test('Helper make Alia Property Object ', () => {
  expect(helpers.makeAliasProperties(cssProps).bgc.property).toEqual('background-color');
});

test('Helper  StaticClassNAmes Generator ', () => {
  expect(helpers.generateStaticClassNames(cssProps, config['css-global-values'])).toHaveProperty('background-color-inherit');
});

test('Helper Extract Property', () => {
  expect(helpers.extractProperty("bgc-red",{...cssProps,...helpers.makeAliasProperties(cssProps)})[0].property).toEqual('background-color');
});
test('Helper Extract Property', () => {
  expect(helpers.extractProperty("bgc--var--red",{...cssProps,...helpers.makeAliasProperties(cssProps)})[0].property).toEqual('background-color');
});
test('Helper Extract Property', () => {
  expect(helpers.extractProperty("backgroundklklkl",{...cssProps,...helpers.makeAliasProperties(cssProps)})[0]).toEqual(null);
});