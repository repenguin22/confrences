/** model */
interface paramObjIF {
    error: boolean;
    errorMsg: string;
    value: string;
}

/**
 * General class for input value check
 */
class validation {
    /** Required method to check */
    requiredCheck(paramObj: paramObjIF) {
        // Remove line break
        let val = paramObj.value.replace(/\r?\n/g, '');
        if (val === '') {
            paramObj.error = true;
            paramObj.errorMsg = '必須入力です';
        }
        return paramObj;
    }

    /** Method to check whether the maximum number of characters is exceeded */
    validMaxLength(maxChar: number, paramObj: paramObjIF) {
        let val = paramObj.value;
        if (val.length > maxChar) {
            paramObj.error = true;
            paramObj.errorMsg = `文字は${maxChar}文字までです。現在${val.length}文字`;
            paramObj.value = val.slice(0, maxChar);
        }
        return paramObj;
    }

    /** Method to check whether the maximum number of line breaks has been exceeded */
    validNewLine(maxNewLine: number, paramObj: paramObjIF) {
        const val = paramObj.value;
        // Count line breaks
        let count = (val.match(/\r?\n/g) || []).length;
        if (maxNewLine === 0) {
            // if maxNewLine == 0 then Line breaks are not allowed
            paramObj.error = false;
            paramObj.errorMsg = '';
            // Remove all line breaks
            paramObj.value = val.replace(/\r?\n/g, '');
        } else {
            if (count > maxNewLine) {
                paramObj.error = true;
                paramObj.errorMsg = `改行は${maxNewLine}個まで入力可能です。現在${count}個`;
                paramObj.value = val;
            }
        }

        return paramObj;
    }
    /** A function that checks whether the same value exists */
    validSameValue(paramObj: paramObjIF, values: any, msg: string) {
        const val = paramObj.value;
        let count = 0;
        values.forEach((v: string) => {
            if (v === val) {
                count++;
            }
        });
        if (count === 1) {
            paramObj.error = false;
            paramObj.errorMsg = '';
        } else {
            paramObj.error = true;
            paramObj.errorMsg = msg;
            paramObj.value = val;
        }

        return paramObj;
    }
}

export default validation;