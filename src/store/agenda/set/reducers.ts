import { AgendaState, AgendaActionTypes, SET_AGENDA_LIST, SET_AGENDA_DETAIL } from './types';

const initialState: AgendaState = {
    agendaList: [],
    agendaDetail: {
        id: '',
        subject: '',
        overview: '',
        choice1: '',
        choice1Count: 0,
        choice2: '',
        choice2Count: 0,
        choice3: '',
        choice3Count: 0,
        choice4: '',
        choice4Count: 0,
        closeDate: '',
        favoriteCount: 0,
        createUserId: '',
        createUserName: '',
        createUserPhotoURL: '',
        createdAt: '',
        delFlg: false
    }
};

export const setAgendaReducer = (state = initialState, action: AgendaActionTypes): AgendaState => {
    switch (action.type) {
        case SET_AGENDA_LIST:
            return { ...state, agendaList: action.payload };
        case SET_AGENDA_DETAIL:
            return { ...state, agendaDetail: action.payload };
        default:
            return state;
    }
};