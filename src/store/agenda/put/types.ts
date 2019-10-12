export interface CreateAgendaForm {
    formContents: string[];
    subject: {
        error: boolean;
        errorMsg: string;
        value: any;
    },
    overview: {
        error: boolean;
        errorMsg: string;
        value: any;
    },
    choice1: {
        error: boolean;
        errorMsg: string;
        value: any;
    },
    choice2: {
        error: boolean;
        errorMsg: string;
        value: any;
    },
    choice3: {
        error: boolean;
        errorMsg: string;
        value: any;
    },
    choice4: {
        error: boolean;
        errorMsg: string;
        value: any;
    },
    [key: string]: CreateFormKey | string[];
}

export interface CreateVoteForm {
    formContents: string[];
    choice: {
        error: boolean;
        errorMsg: string;
        value: any;
    },
    reason: {
        error: boolean;
        errorMsg: string;
        value: any;
    }
    [key: string]: CreateFormKey | string[];
}

interface CreateFormKey {
    error: boolean;
    errorMsg: string;
    value: any;
}

