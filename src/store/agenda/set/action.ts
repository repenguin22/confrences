import { Agenda, SET_AGENDA_LIST } from './types';

export const setAgendaList = (agendaList: Agenda[]) => {
    return {
        type: SET_AGENDA_LIST,
        payload: agendaList
    };
};