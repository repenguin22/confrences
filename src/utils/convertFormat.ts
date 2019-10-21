import { Agenda, Vote } from '../store/agenda/set/types';


/**
 * object format convert General Class
 */
class convertFormat {
    convertYMD(_timestamp: any): string {
        console.log(_timestamp);
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
                currentIndex = andIndex + 1;
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
    isPageParamsCorrect(urlMaps: Map<string, string[]>, list: Agenda[] | Vote[], limit: number): boolean {
        const pageNum = this.convertPageParseInt(urlMaps);
        if (pageNum === -1) {
            return false;
        }
        if (list.length === 0) {
            return false;
        }
        if (limit <= 0) {
            return false;
        }
        if (pageNum < 0 || (list.length / limit) < pageNum) {
            return false;
        }
        return true;
    }
    convertPageParseInt(urlMaps: Map<string, string[]>): number {
        if (!urlMaps) {
            return -1;
        }
        const pageObj = urlMaps.get('page');
        if (!pageObj || pageObj[0] === '') {
            return -1;
        }
        try {
            return parseInt(pageObj[0]);
        } catch (err) {
            return -1;
        }
    }
    convertSearchWord(urlMaps: Map<string, string[]>): string {
        if (urlMaps === null) {
            return '';
        }
        const qObj = urlMaps.get('q');
        if (!qObj || qObj[0] === '') {
            return '';
        }
        return qObj[0];
    }
}

export default convertFormat;