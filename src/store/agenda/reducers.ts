import { AgendaState, AgendaActionTypes, SET_AGENDA_LIST } from './types';

const initialState: AgendaState = {
    agendaList: [],
};

export const setAgendaReducer = (state = initialState, action: AgendaActionTypes): AgendaState => {
    switch (action.type) {
        case SET_AGENDA_LIST:
            return { ...state, agendaList: action.payload };
        default:
            return state;
    }
};