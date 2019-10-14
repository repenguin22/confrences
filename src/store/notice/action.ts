import { Notice, SET_NOTICE } from './types';

export const setNotice = (notice: Notice) => {
    return {
        type: SET_NOTICE,
        payload: {
            target: notice.target,
            //count: notice.count,
            type: notice.type,
            message: notice.message,
            vertical: notice.vertical,
            horizontal: notice.horizontal
        }
    };
};