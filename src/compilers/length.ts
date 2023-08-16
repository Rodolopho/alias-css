export default {
     lenNumPer:(value:string)=>
        value.replace(/[-]([-]?[\w])/g,' $1').
        replace(/([\d])d([\d])/g,'$1.$2').
        replace(/([\d])p[\s]/g,"$1% ").
        replace(/([\d])p$/,"$1%"),
     lenByNumPer:(value:string)=>
        value.replace(/[-]([-]?[\w])/g,' $1')
        .replace(/([\d])d([\d])/g,'$1.$2')
        .replace(/([\d])p[\s]/g,"$1% ").replace(/([\d])p$/,"$1%")
        .replace(/[\s]by[\s]/g,' / '),
     lenFitContent:(value:string)=>
        value.replace(/fit-content-(\w+)/,'fit-content( $1 )')
        .replace(/([\d])d([\d])/g,'$1.$2')
        .replace(/([\d])p[\s]/g,"$1% ")
        .replace(/([\d])p$/,"$1%"),

     length:(value:string)=>{},   
}
   
