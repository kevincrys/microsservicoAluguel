export class Utils{
checkNullOrBlank<T>(dado: T): boolean{
const verified =  dado === null|| dado === undefined|| dado === ""
return verified

}
}