import { Confirmation } from 'primeng/api';

export class ChangeConfirmation implements Confirmation {
    message?: string;
    icon?: string;
    header?: string;
    accept?: () => void;
    reject?: () => void;

    constructor() {
        this.message = 'COMMON_MSG.CONFIRM_CHANGE';
        this.header = 'COMMON_MSG.CONFIRM_TITLE';
        this.icon = 'pi pi-exclamation-triangle';
    }
}
