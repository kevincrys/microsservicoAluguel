export class Utils{
checkNullOrBlank<T>(dado: T): boolean{
    console.log(dado)
const verified =  dado === null|| dado === undefined|| dado === ""||dado ==="null"||dado === "undefined"
return verified

}
}