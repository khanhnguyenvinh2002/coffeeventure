

export class Account {
    userInfo: AccountInfo;
    accessToken: string;
    canAccess: boolean;
}

export class AccountInfo {
    firstName: string;
    userName: string;
    fullName: string;
    avatar: string;
    language: string;
    email: string;
}