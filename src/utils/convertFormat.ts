/**
 * object format convert General Class
 */
class convertFormat {
    convertYMD(_timestamp: any): string {
        var _d = _timestamp ? new Date(_timestamp * 1000) : new Date();
        var Y = _d.getFullYear();
        var m = ('0' + (_d.getMonth() + 1)).slice(-2);
        var d = ('0' + _d.getDate()).slice(-2);
        var H = ('0' + _d.getHours()).slice(-2);
        var i = ('0' + _d.getMinutes()).slice(-2);
        //var s = ('0' + _d.getSeconds()).slice(-2);

        return `${Y}/${m}/${d} ${H}:${i}`;
    }
    convertURLParams(params: string, maxParamNum: number): Map<string, string>[] | null {
        if (params[0] === '') {
            return null;
        }
        const localParams = params.slice(1);
        let currentIndex = 0;
        let urlMaps = [];
        for (let i = 0; i < maxParamNum; i++) {
            const equalIndex = localParams.indexOf('=', currentIndex);
            if (equalIndex === -1) {
                return null;
            }
            const name = localParams.slice(currentIndex, equalIndex);
            currentIndex = equalIndex;

            const andIndex = localParams.indexOf('&', currentIndex);
            let value = '';
            if (andIndex === -1) {
                value = localParams.slice(equalIndex + 1);
                currentIndex = params.length - 1;
            } else {
                value = localParams.slice(equalIndex + 1, andIndex);
                currentIndex = andIndex;
            }
            if (name === '' || value === '') {
                return null;
            }
            let urlMap = new Map<string, string>();
            urlMap.set(name, name);
            urlMap.set(value, value);
            urlMaps.push(urlMap);
            if (currentIndex === params.length - 1) {
                break;
            }
        }
        console.log(urlMaps);
        return urlMaps;
    }
}

export default convertFormat;