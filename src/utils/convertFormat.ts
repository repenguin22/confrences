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
    convertURLParams(params: string, maxParamNum: number): Map<string, string[]> | null {
        if (params[0] === '') {
            return null;
        }
        const localParams = params.slice(1);
        let currentIndex = 0;
        let urlMaps = new Map<string, string[]>();
        for (let i = 0; i < maxParamNum; i++) {
            const equalIndex = localParams.indexOf('=', currentIndex);
            if (equalIndex === -1) {
                return null;
            }
            const name = localParams.slice(currentIndex, equalIndex);
            currentIndex = equalIndex;

            const andIndex = localParams.indexOf('&', currentIndex);
            let values = '';
            if (andIndex === -1) {
                values = localParams.slice(equalIndex + 1);
                currentIndex = params.length - 1;
            } else {
                values = localParams.slice(equalIndex + 1, andIndex);
                currentIndex = andIndex;
            }
            if (name === '' || values === '') {
                return null;
            }
            let valueList: string[] = [];
            const halfSpaceValue = values.split(' ');
            halfSpaceValue.forEach((hsVal: string) => {
                hsVal.split('　').forEach(zsVal => {
                    valueList.push(zsVal);
                });
            });
            urlMaps.set(name, valueList);
            if (currentIndex === params.length - 1) {
                break;
            }
        }
        return urlMaps;
    }
}

export default convertFormat;