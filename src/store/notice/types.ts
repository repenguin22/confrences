export const SET_NOTICE = 'SET_NOTICE';

export interface Notice {
    count: number,
    type: string | null,
    message: string | null,
    vertical: string | null,
    horizontal: string | null
}

// for useSelector
export interface NoticeState {
    notice: {
        count: number,
        type: string | null,
        message: string | null,
        vertical: string | null,
        horizontal: string | null
    }
}

interface setNoticeAction {
    type: typeof SET_NOTICE;
    payload: Notice;
}

export type NoticeActionTypes = setNoticeAction;

export enum SnackBarTypeVariation {
    success = 'success',
    info = 'info',
    warning = 'warning',
    error = 'error',
}