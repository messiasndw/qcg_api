
export class Helper{

    static removeUndefined(obj: {}){
        return Object.keys(obj).forEach((k) => obj[k] == undefined && delete obj[k]);
    }
}