/**
 * object format convert General Class
 */
class convertFormat {
    convertYMD(_timestamp: any) {
        var _d = _timestamp ? new Date(_timestamp * 1000) : new Date();
        var Y = _d.getFullYear();
        var m = ('0' + (_d.getMonth() + 1)).slice(-2);
        var d = ('0' + _d.getDate()).slice(-2);
        var H = ('0' + _d.getHours()).slice(-2);
        var i = ('0' + _d.getMinutes()).slice(-2);
        //var s = ('0' + _d.getSeconds()).slice(-2);

        return `${Y}/${m}/${d} ${H}:${i}`;
    }
}

export default convertFormat;