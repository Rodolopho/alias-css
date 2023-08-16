export default function unsign(value :string){
    console.log(value)
    if(value) {
        return value.replace(/[-]([\d])/g,'$1');
    }
}
