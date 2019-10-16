export const SET_AGENDA_LIST = 'SET_AGENDA_LIST';
export const SET_AGENDA_DETAIL = 'SET_AGENDA_DETAIL';
export const SET_AGENDA_DETAIL_VOTE_LIST = 'SET_AGENDA_DETAIL_VOTE_LIST';
export const SET_RELOAD = 'SET_RELOAD';

export interface Agenda {
    id: string;
    subject: string;
    Postscript1: string;
    Postscript2: string;
    Postscript3: string;
    overview: string;
    choice1: string;
    choice1Count: number;
    choice2: string;
    choice2Count: number;
    choice3: string;
    choice3Count: number;
    choice4: string;
    choice4Count: number;
    openDate: Date;
    closeDate: Date;
    favoriteCount: number;
    createUserId: string;
    createUserName: string;
    createUserPhotoURL: string;
    createdAt: Date;
    updateAt: Date;
    delFlg: boolean;
}

export interface Vote {
    id: string;
    choice: string;
    reason: string;
    goodCount: number;
    createUserId: string;
    createUserName: string;
    createUserPhotoURL: string;
    createdAt: Date;
    updateAt: Date;
    delFlg: boolean
}

export interface AgendaState {
    agendaList: Agenda[];
    agendaDetail: Agenda;
    voteList: Vote[];
    reloadCount: number;
}

// for useSelector
export interface AllAgendaState {
    agenda: {
        agendaList: Agenda[];
        agendaDetail: Agenda;
        voteList: Vote[];
        reloadCount: number;
    }
}

interface setAgendaListAction {
    type: typeof SET_AGENDA_LIST;
    payload: Agenda[];
}

interface setAgendaDetailAction {
    type: typeof SET_AGENDA_DETAIL;
    payload: Agenda;
}

interface setAgendaDetailVoteListAction {
    type: typeof SET_AGENDA_DETAIL_VOTE_LIST;
    payload: Vote[];
}

interface setReloadAction {
    type: typeof SET_RELOAD;
}

export type AgendaActionTypes = setAgendaListAction | setAgendaDetailAction | setAgendaDetailVoteListAction | setReloadAction;