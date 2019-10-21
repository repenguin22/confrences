export interface Agenda {
    id: string;
    subject: string;
    Postscript1: string;
    Postscript2: string;
    Postscript3: string;
    overview: string;
    choice1: string;
    choice1Count: number;
    choice2: string;
    choice2Count: number;
    choice3: string;
    choice3Count: number;
    choice4: string;
    choice4Count: number;
    openDate: Date;
    isOpen: boolean;
    closeDate: Date;
    isClose: boolean;
    favoriteCount: number;
    createUserId: string;
    createUserName: string;
    createUserPhotoURL: string;
    createdAt: Date;
    updateAt: Date;
    delFlg: boolean;
}