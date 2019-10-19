export const SET_NOTICE = 'SET_NOTICE';

export interface Notice {
    target: string,
    count: number,
    type: string | null,
    message: string | null,
    vertical: string | null,
    horizontal: string | null
    displayTime: number
}

// for useSelector
export interface NoticeState {
    notice: {
        target: string,
        count: number,
        type: string | null,
        message: string | null,
        vertical: string | null,
        horizontal: string | null
        displayTime: number
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