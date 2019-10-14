import { Agenda, Vote, AgendaDetailFavo, SET_AGENDA_LIST, SET_AGENDA_DETAIL, SET_AGENDA_DETAIL_VOTE_LIST, SET_AGENDA_DETAIL_FAVO, SET_RELOAD } from './types';

export const setAgendaList = (agendaList: Agenda[]) => {
    return {
        type: SET_AGENDA_LIST,
        payload: agendaList
    };
};

export const setAgendaDetail = (agenda: Agenda) => {
    return {
        type: SET_AGENDA_DETAIL,
        payload: agenda
    };
};

export const setAgendaDetailVoteList = (voteList: Vote[]) => {
    return {
        type: SET_AGENDA_DETAIL_VOTE_LIST,
        payload: voteList
    };
};

export const setAgendaDetailFavo = (favo: AgendaDetailFavo) => {
    return {
        type: SET_AGENDA_DETAIL_FAVO,
        payload: favo
    };
};

export const setReload = () => {
    return {
        type: SET_RELOAD
    };
};