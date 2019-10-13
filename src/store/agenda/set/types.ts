export const SET_AGENDA_LIST = 'SET_AGENDA_LIST';
export const SET_AGENDA_DETAIL = 'SET_AGENDA_DETAIL';
export const SET_AGENDA_DETAIL_VOTE_LIST = 'SET_AGENDA_DETAIL_VOTE_LIST';

export interface Agenda {
    id: string;
    subject: string;
    overview: string;
    choice1: string;
    choice1Count: number;
    choice2: string;
    choice2Count: number;
    choice3: string;
    choice3Count: number;
    choice4: string;
    choice4Count: number;
    closeDate: string;
    favoriteCount: number;
    createUserId: string;
    createUserName: string;
    createUserPhotoURL: string;
    createdAt: Date;
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
    delFlg: boolean
}

export interface AgendaState {
    agendaList: Agenda[];
    agendaDetail: Agenda;
    voteList: Vote[];
}

// for useSelector
export interface AllAgendaState {
    agenda: {
        agendaList: Agenda[];
        agendaDetail: Agenda;
        voteList: Vote[];
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

export type AgendaActionTypes = setAgendaListAction | setAgendaDetailAction | setAgendaDetailVoteListAction;