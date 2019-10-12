import { Agenda, SET_AGENDA_LIST, SET_AGENDA_DETAIL } from './types';

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