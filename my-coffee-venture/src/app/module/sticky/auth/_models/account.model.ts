import { AccountInfo } from './account-info.model';

export class Account {
    isAuthenticated: boolean;
    user: AccountInfo;
    redirect: string;
}
