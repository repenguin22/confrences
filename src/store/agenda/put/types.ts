export interface CreateAgendaForm {
    formContents: string[];
    subject: {
        errorMsg: string;
        error: boolean;
        value: any;
    },
    overview: {
        errorMsg: string;
        error: boolean;
        value: any;
    },
    choice1: {
        errorMsg: string;
        error: boolean;
        value: any;
    },
    choice2: {
        errorMsg: string;
        error: boolean;
        value: any;
    },
    choice3: {
        errorMsg: string;
        error: boolean;
        value: any;
    },
    choice4: {
        errorMsg: string;
        error: boolean;
        value: any;
    },
    [key: string]: CreateAgendaFormKey | string[];
}

interface CreateAgendaFormKey {
    errorMsg: string;
    error: boolean;
    value: any;
}

