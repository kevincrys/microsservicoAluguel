export class Utils{
checkNullOrBlank<T>(dado: T): boolean{
const verified =  dado === null|| dado === undefined|| dado === ""||dado ==="null"||dado === "undefined"
return verified

}

getData(): string {
    const currentTimestamp = Date.now();
    const currentDate = new Date(currentTimestamp);
    const formattedDate = currentDate.toISOString();
    

    return  formattedDate
    }
}