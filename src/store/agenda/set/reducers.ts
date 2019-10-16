import { AgendaState, AgendaActionTypes, SET_AGENDA_LIST, SET_AGENDA_DETAIL, SET_AGENDA_DETAIL_VOTE_LIST, SET_RELOAD } from './types';

const initialState: AgendaState = {
    agendaList: [],
    agendaDetail: {
        id: '',
        subject: '',
        Postscript1: '',
        Postscript2: '',
        Postscript3: '',
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
        createdAt: new Date(),
        updateAt: new Date(),
        delFlg: false
    },
    voteList: [],
    reloadCount: 0
};

export const setAgendaReducer = (state = initialState, action: AgendaActionTypes): AgendaState => {
    switch (action.type) {
        case SET_AGENDA_LIST:
            return { ...state, agendaList: action.payload };
        case SET_AGENDA_DETAIL:
            return { ...state, agendaDetail: action.payload };
        case SET_AGENDA_DETAIL_VOTE_LIST:
            return { ...state, voteList: action.payload };
        case SET_RELOAD:
            return { ...state, reloadCount: state.reloadCount + 1 };
        default:
            return state;
    }
};