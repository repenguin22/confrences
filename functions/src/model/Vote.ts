export interface Vote {
    id: string;
    choice: string;
    reason: string;
    goodCount: number;
    createUserId: string;
    createUserName: string;
    createUserPhotoURL: string;
    createdAt: Date;
    updateAt: Date;
    delFlg: boolean
}