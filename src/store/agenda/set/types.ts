export const SET_AGENDA_LIST = 'SET_AGENDA_LIST';
export const SET_AGENDA_DETAIL = 'SET_AGENDA_DETAIL';

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

export interface AgendaState {
    agendaList: Agenda[];
    agendaDetail: Agenda;
}

// for useSelector
export interface AllAgendaState {
    agenda: {
        agendaList: Agenda[];
        agendaDetail: Agenda;
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

export type AgendaActionTypes = setAgendaListAction | setAgendaDetailAction;