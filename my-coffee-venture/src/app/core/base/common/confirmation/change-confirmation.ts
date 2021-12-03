import { Confirmation } from 'primeng/api';

export class ChangeConfirmation implements Confirmation {
    message?: string;
    icon?: string;
    header?: string;
    accept?: () => void;
    reject?: () => void;

    constructor() {
        this.message = 'Confirm change';
        this.header = 'Do you want to change?';
        this.icon = 'pi pi-exclamation-triangle';
    }
}
