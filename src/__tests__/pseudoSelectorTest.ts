import pseudoSelector from '../static/pseudoSelector'

test('Pseudo Selector nth-child semantic ',()=>{
    expect(pseudoSelector('--nth-child-2n-bg-red')).toEqual(['-bg-red',':nth-child(2n)'])
})
test('Pseudo Selector nth-child alias ',()=>{
    expect(pseudoSelector('-nc-2n-bg-red')).toEqual(['-bg-red',':nth-child(2n)'])
})
test('Pseudo Selector nth-child last of type alias ',()=>{
    expect(pseudoSelector('-nlc-2n-bg-red')).toEqual(['-bg-red',':nth-last-child(2n)'])
})
test('Pseudo Selector not alias ',()=>{
    expect(pseudoSelector('-not-2n-bg-red')).toEqual(['-bg-red',':nth-of-type(2n)'])
})

test('Pseudo Selector not alias ',()=>{
    expect(pseudoSelector('--not-div-bg-red')).toEqual(['-bg-red',':not(div)'])
})

test('Pseudo Selector genera',()=>{
    expect(pseudoSelector('--hover-bg-red')).toEqual(['-bg-red',':hover'])
})
test('Pseudo Selector general alias ',()=>{
    expect(pseudoSelector('-haf-bg-red')).toEqual(['-bg-red',':hover::after'])
})

test('Pseudo Selector general alias ',()=>{
    expect(pseudoSelector('--hover-after-bg-red')).toEqual(['-bg-red',':hover::after'])
})
test('Pseudo Selector general alias ',()=>{
    expect(pseudoSelector('_hover-after-bg-red')).toEqual(null)
})